// Local imports
import { Layout } from 'components/Layout'





export default function HomePage(props) {
	const { items } = props

	return (
		<Layout items={items}>
			foo
		</Layout>
	)
}

export async function getStaticProps() {
	const { getItemsProps } = await import('helpers/getItemsProps')

	return getItemsProps()
}
