// Module imports
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





// Local imports
import { useAuth } from 'contexts/AuthContext'





export function LeftNav() {
	const Router = useRouter()
	const {
		isLoggedIn,
		settings,
	} = useAuth()

	return (
		<aside className="left-nav">
			<div className="box menu">
				<p className="menu-label">
					Items
				</p>

				<ul className="menu-list">
					<li>
						<Link href="/unite/held-items">
							<a
								className={classnames({
									'is-active': Router.pathname.startsWith('/unite/held-items'),
								})}>
									Held Items
							</a>
						</Link>
					</li>
				</ul>

				<p className="menu-label">
					Utilities
				</p>

				<ul className="menu-list">
					<li>
						<Link href="/unite/item-upgrade-calculator">
							<a
								className={classnames({
									'is-active': Router.pathname === '/unite/item-upgrade-calculator',
								})}>
								Item Upgrade Calculator
							</a>
						</Link>
					</li>
				</ul>
			</div>

			<div className="box menu">
				<p className="menu-label">
					Bugs
				</p>

				<ul className="menu-list">
					<li>
						<Link href="/unite/known-bugs">
							<a
								className={classnames({
									'is-active': Router.pathname === '/unite/known-bugs',
								})}>
								Known Bugs
							</a>
						</Link>
					</li>

					<li>
						<Link href="/unite/report-a-bug">
							<a
								className={classnames({
									'is-active': Router.pathname === '/unite/report-a-bug',
								})}>
								Report a Bug
							</a>
						</Link>
					</li>
				</ul>
			</div>

			{(isLoggedIn && (settings.isModerator || settings.isAdmin)) && (
				<div className="box menu">
					{settings.isModerator && (
						<>
							<p className="menu-label">
								Moderation
							</p>

							<ul className="menu-list">
								<li>
									<Link href="/unite/bug-reports">
										<a
											className={classnames({
												'is-active': Router.pathname === '/unite/bug-reports',
											})}>
											Bug Reports
										</a>
									</Link>
								</li>
							</ul>
						</>
					)}

					{settings.isAdmin && (
						<>
							<p className="menu-label">
								Admin
							</p>

							<ul className="menu-list">
								<li>
									<Link href="/unite/blorp">
										<a
											className={classnames({
												'is-active': Router.pathname === '/unite/blorp',
											})}>
											Blorp
										</a>
									</Link>
								</li>
							</ul>
						</>
					)}
				</div>
			)}
		</aside>
	)
}
