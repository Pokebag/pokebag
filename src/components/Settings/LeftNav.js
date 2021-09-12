// Module imports
import { useRouter } from 'next/router'
import classnames from 'classnames'
import Link from 'next/link'





export function LeftNav() {
	const Router = useRouter()

	return (
		<aside className="left-nav">
			<div className="box menu">
				<p className="menu-label">
					General
				</p>

				<ul className="menu-list">
					<li>
						<Link href="/settings/profile">
							<a
								className={classnames({
									'is-active': Router.pathname.startsWith('/settings/profile'),
								})}>
									Profile
							</a>
						</Link>
					</li>
				</ul>

				<p className="menu-label">
					Security
				</p>

				<ul className="menu-list">
					<li>
						<Link href="/settings/password">
							<a
								className={classnames({
									'is-active': Router.pathname.startsWith('/settings/password'),
								})}>
									Password
							</a>
						</Link>
					</li>
				</ul>
			</div>
		</aside>
	)
}
