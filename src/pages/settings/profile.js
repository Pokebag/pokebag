// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { LeftNav } from 'components/Settings/LeftNav'
import { PageHeader } from 'components/PageHeader'
import { useAuth } from 'contexts/AuthContext'
import { UsernameForm } from 'components/Settings/UsernameForm'





export default function UserSettingsPage() {
	const {
		isLoaded,
		profile,
	} = useAuth()

	return (
		<BaseLayout
			description="User Settings"
			title="User Settings">
			<div className="columns">
				<div className="column is-one-quarter">
					<LeftNav />
				</div>

				<div className="column is-three-quarters">
					<PageHeader>
						<h2 className="title">
							{'Edit Your Profile'}
						</h2>
					</PageHeader>

					{(!isLoaded || !profile) && (
						<section className="box section">
							{'Loading...'}
						</section>
					)}

					{(isLoaded && profile) && (
						<UsernameForm />
					)}

					{(isLoaded && profile) && (
						<section className="box section">
							<h3 className="title is-4">
								{'Update your email'}
							</h3>
						</section>
					)}
				</div>
			</div>
		</BaseLayout>
	)
}
