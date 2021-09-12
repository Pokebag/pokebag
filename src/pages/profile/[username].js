// Module imports
import {
	useCallback,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { firestore } from 'helpers/firebase'
import Link from 'next/link'





// Local imports
import { ActivityFeed } from 'components/ActivityFeed'
import { BaseLayout } from 'components/BaseLayout'
import { useAuth } from 'contexts/AuthContext'





function getActivityFeedItemDate (activityFeedItem) {
	return activityFeedItem.createdAt.toDate()
}

function ActivityFeedItem (props) {
	const { item } = props

	switch (item.type) {
		case 'create-account':
			return (
				<p>Joined Pokébag! 🎉😍🎊</p>
			)

		case 'create-bug-report':
			return (
				<p>Created a <Link href={`/unite/bug-reports/${item.bugReportID}`}>bug report!</Link></p>
			)

		default:
			return (
				<pre>{JSON.stringify(item)}</pre>
			)
	}
}

export default function ProfilePage(props) {
	const { profile } = props
	const [activityFeedItems, setActivityFeedItems] = useState(null)

	const dateFormatter = useMemo(() => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }), [])

	const updateActivityFeed = useCallback(collectionSnapshot => {
		const newActivityFeedItems = []

		collectionSnapshot.forEach(documentSnapshot => {
			newActivityFeedItems.push({
				...documentSnapshot.data(),
				id: documentSnapshot.id,
			})
		})

		setActivityFeedItems(newActivityFeedItems)
	}, [setActivityFeedItems])

	useEffect(async () => {
		if (profile) {
			try {
				const collectionSnapshot = await firestore
					.collection('activity-feeds')
					.doc(profile.id)
					.collection('items')
					.get()

				updateActivityFeed(collectionSnapshot)
			} catch (error) {
				console.log(error)
			}
		}
	}, [
		profile,
		updateActivityFeed,
	])

	return (
		<BaseLayout
			description="Pokébag aims to provide a great resource for information and tools for all Pokémon games!"
			title="Home">
			<div className="columns">
				<div className="column is-one-quarter">
					<section className="box section">
						<div className="content">
							<div className="image is-256x256">
								<img src={profile.avatarURL} />
							</div>

							<h2 className="title">{profile.username}</h2>
							<p>Member since <time dateTime={profile.createdAt}>{dateFormatter.format(new Date(profile.createdAt))}</time></p>
						</div>
					</section>
				</div>

				<div className="column is-three-quarters">
					<section className="box section">
						<h3 className="title is-4">Activity</h3>

						{!Array.isArray(activityFeedItems) && (
							<p>Loading...</p>
						)}

						{(Array.isArray(activityFeedItems) && !activityFeedItems.length) && (
							<p>No activity... yet.</p>
						)}

						{(Array.isArray(activityFeedItems) && Boolean(activityFeedItems.length)) && (
							<ActivityFeed
								getDate={getActivityFeedItemDate}
								itemComponent={<ActivityFeedItem />}
								items={activityFeedItems} />
						)}
					</section>
				</div>
			</div>
		</BaseLayout>
	)
}

export async function getServerSideProps (context) {
	const [
		{ firestore },
	] = await Promise.all([
		import('helpers/firebase'),
	])

	const { username } = context.query
	let profile = null

	const profilesSnapshot = await firestore
		.collection('profiles')
		.where('username', '==', username)
		.get()

	profilesSnapshot.forEach(profileSnapshot => {
		profile = {
			...profileSnapshot.data(),
			id: profileSnapshot.id,
		}
	})

	if (profile) {
		profile.createdAt = profile.createdAt.toDate().toISOString()

		return {
			props: { profile },
		}
	}

	const profileSnapshot = await firestore
		.collection('profiles')
		.doc(username)
		.get()

	if (profileSnapshot.exists) {
		return {
			redirect: {
				destination: `/profile/${profileSnapshot.data().username}`,
				permanent: true,
			},
		}
	}

	return { notFound: true }
}
