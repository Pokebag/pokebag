export function Heading(props) {
	const {
		children,
		id,
		level,
	} = props

	const headingProps = {
		id,
		children: (
			<>
				<a
					className="slug-link"
					href={`#${id}`}>#</a>
				{children}
			</>
		),
	}

	switch (level) {
		case 1:
			return <h1 {...headingProps} />

		case 2:
			return <h2 {...headingProps} />

		case 3:
			return <h3 {...headingProps} />

		case 4:
			return <h4 {...headingProps} />

		case 5:
			return <h5 {...headingProps} />

		case 6:
			return <h6 {...headingProps} />
	}
}
