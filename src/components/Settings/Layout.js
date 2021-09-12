// Module imports
import PropTypes from 'prop-types'





// Local imports
import { BaseLayout } from 'components/BaseLayout'
import { Breadcrumbs } from 'components/Breadcrumbs'
import { LeftNav } from 'components/Settings/LeftNav'
import { PageHeader } from 'components/PageHeader'
import { RequireAuth } from 'components/RequireAuth'
import { useAuth } from 'contexts/AuthContext'





export function Layout(props) {
	const { children } = props
	const {
		isLoaded,
		profile,
	} = useAuth()

	return (
		<BaseLayout
			description="Account Settings"
			title="Account Settings">
			<div className="columns">
				<div className="column is-one-quarter">
					<LeftNav />
				</div>

				<div className="column is-three-quarters">
					<Breadcrumbs />

					<PageHeader>
						<h2 className="title">
							{'Account Settings'}
						</h2>
					</PageHeader>

					<RequireAuth>
						{(!isLoaded || !profile) && (
							<section className="box section">
								{'Loading...'}
							</section>
						)}

						{(isLoaded && profile) && children}
					</RequireAuth>
				</div>
			</div>
		</BaseLayout>
	)
}

Layout.propTypes = {
	children: PropTypes.node,
}
