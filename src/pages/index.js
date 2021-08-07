// Module imports
import Link from 'next/link'





function mapItemValues(item) {
  return (
    <li key={item.id}>
      <Link href={`/items/${item.id}`}>
        {item.displayName}
      </Link>
    </li>
  )
}

export default function ItemPage(props) {
  const { items } = props

  return (
    <ul>
      {Object.values(items).map(mapItemValues)}
    </ul>
  )
}

export async function getStaticProps() {
  const { getItemsProps } = await import('helpers/getItemsProps')

  return getItemsProps()
}
