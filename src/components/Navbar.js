// Module imports
import {
	useCallback,
	useState,
} from 'react'
import classnames from 'classnames'
import NextImage from 'next/image'
import Link from 'next/link'





// Local imports
import { useAuth } from 'contexts/AuthContext'





export function Navbar() {
	const {
		isLoggedIn,
		logout,
		profile,
	} = useAuth()

	const [menuIsOpen, setMenuIsOpen] = useState(false)

	const toggleMenuOpen = useCallback(() => {
		setMenuIsOpen(previousValue => !previousValue)
	}, [setMenuIsOpen])

	return (
		<nav
			aria-label="main navigation"
			className="navbar is-sticky-top"
			role="navigation" >
			<div className="container">
				<div className="navbar-brand">
					<Link href="/">
						<a className="navbar-item">
							<NextImage
								height="207"
								src="/images/brand/logo.black.png"
								width="1037" />
						</a>
					</Link>

					<button
						aria-expanded="false"
						aria-label="menu"
						className={classnames({
							'navbar-burger': true,
							'is-active': menuIsOpen,
						})}
						data-target="navbarBasicExample"
						onClick={toggleMenuOpen}
						type="button">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</button>
				</div>

				<div
					className={classnames({
						'navbar-menu': true,
						'is-active': menuIsOpen,
					})}
					id="navbarBasicExample">
					<div className="navbar-start">
						{/* <Link href="/">
							<a className="navbar-item">Home</a>
						</Link> */}

						<Link href="/blog">
							<a className="navbar-item">Blog</a>
						</Link>

						<div className="navbar-item has-dropdown is-hoverable">
							<div className="navbar-link">
								Games
							</div>

							<div className="navbar-dropdown">
								<Link href="/unite">
									<a className="navbar-item">Pokémon UNITE</a>
								</Link>
							</div>
						</div>
					</div>

					<div className="navbar-end">
						{(isLoggedIn && Boolean(profile)) && (
							<div className="navbar-item has-dropdown is-hoverable">
								<div className="navbar-link">
									<span className="icon-text">
										<span className="icon">
											<figure className="image is-24x24 is-rounded">
												<img src={profile.avatarURL} />
											</figure>
										</span>
										<span>{profile.username}</span>
									</span>
								</div>

								<div className="navbar-dropdown is-right">
									<Link href={`/profile/${profile.username}`}>
										<a className="navbar-item">Profile</a>
									</Link>

									<Link href="/settings/profile">
										<a className="navbar-item">Settings</a>
									</Link>

									<hr className="dropdown-divider" />

									<button
										className="button dropdown-item has-text-left"
										onClick={logout}>
										Logout
									</button>
								</div>
							</div>
						)}

						{!isLoggedIn && (
							<div className="navbar-item">
								<div className="buttons">
									<Link href="/create-account">
										<a className="button is-primary">
											<strong>Create Account</strong>
										</a>
									</Link>

									<Link href="/login">
										<a className="button is-light">Log in</a>
									</Link>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</nav>
	)
}
