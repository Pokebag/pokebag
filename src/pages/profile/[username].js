// Module imports
import Link from 'next/link'





// Local imports
import { BaseLayout } from 'components/BaseLayout'





export default function ProfilePage(props) {
	const { profile } = props

	const dateFormatter = new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' })

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

						<p>No activity... yet.</p>

						{/* <ol>
							<li></li>
						</ol> */}
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
