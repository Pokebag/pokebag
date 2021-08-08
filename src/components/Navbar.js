// Module imports
import {
	useCallback,
	useState,
} from 'react'
import classnames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'





export function Navbar() {
	const [menuIsOpen, setMenuIsOpen] = useState(false)

	const toggleMenuOpen = useCallback(() => {
		setMenuIsOpen(previousValue => !previousValue)
	}, [setMenuIsOpen])

	return (
		<nav
			aria-label="main navigation"
			className="navbar is-fixed-top"
			role="navigation" >
			<div className="container">
				<div className="navbar-brand">
					<a
						className="navbar-item"
						href="https://bulma.io">
						<Image
							height="207"
							src="/images/brand/logo.black.png"
							width="1037" />
					</a>

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
						<Link href="/">
							<a className="navbar-item">Home</a>
						</Link>

						{/* <Link href="/">
							<a className="navbar-item">
								Documentation
							</a>
						</Link> */}

						{/* <div className="navbar-item has-dropdown is-hoverable">
							<Link className="navbar-link">
								More
							</Link>

							<div className="navbar-dropdown">
								<Link className="navbar-item">
									About
								</Link>
								<Link className="navbar-item">
									Jobs
								</Link>
								<Link className="navbar-item">
									Contact
								</Link>
								<hr className="navbar-divider" />
								<Link className="navbar-item">
									Report an issue
								</Link>
							</div>
						</div> */}
					</div>

					{/* <div className="navbar-end">
						<div className="navbar-item">
							<div className="buttons">
								<Link className="button is-primary">
									<strong>Sign up</strong>
								</Link>
								<Link className="button is-light">
									Log in
								</Link>
							</div>
						</div>
					</div> */}
				</div>
			</div>
		</nav>
	)
}
