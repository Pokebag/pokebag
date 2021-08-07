// Module imports
import { useCallback } from 'react'





export default function ItemPage(props) {
  const {
    item,
    stats,
  } = props

  const mapStats = useCallback((levelStats, levelIndex) => {
    const level = levelIndex + 1
    const statCount = Object.keys(levelStats).length

    if (!statCount) {
      return (
        <tr key={level}>
          <th>{level}</th>
          <td colSpan="2">No information available yet.</td>
        </tr>
      )
    }

    return Object.entries(levelStats).map(([statID, value], statIndex) => (
      <tr key={`${level}:${statID}`}>
        {(statIndex === 0) && (
          <th rowSpan={statCount}>{level}</th>
        )}

        <td>{stats[statID]?.displayName || statID}</td>
        <td>{value}</td>
      </tr>
    ))
  }, [stats])

  return (
    <>
      <header className="hero">
        <div className="hero-body">
          <h2 className="title">{item.displayName}</h2>
          <p className="subtitle">{item.description}</p>
        </div>
      </header>

      <section className="section">
        <table className="table is-bordered is-fullwidth">
          <thead>
            <tr>
              <th>Level</th>
              <th colSpan="2">Bonus</th>
            </tr>
          </thead>

          <tbody>
            {item.stats.map(mapStats)}
          </tbody>
        </table>
      </section>
    </>
  )
}

export async function getStaticPaths() {
  const { getItemPaths } = await import('helpers/getItemPaths')

  return getItemPaths()
}

export async function getStaticProps(context) {
  const [
    { getItemProps },
    { getStatsProps },
  ] = await Promise.all([
    import('helpers/getItemProps'),
    import('helpers/getStatsProps'),
  ])

  const [
    { props: itemProps },
    { props: statsProps },
  ] = await Promise.all([
    getItemProps(context),
    getStatsProps(context),
  ])

  return {
    props: {
      ...itemProps,
      ...statsProps,
    },
  }
}
