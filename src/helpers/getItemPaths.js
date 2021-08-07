export async function getItemPaths() {
  const [
    fs,
    path,
  ] = await Promise.all([
    import('fs/promises'),
    import('path'),
  ])

  const itemsPath = path.resolve(process.cwd(), 'src', 'data', 'items')
  const itemFiles = await fs.readdir(itemsPath)
  const items = itemFiles.map(itemFilename => {
    return itemFilename.replace(/\.json$/, '')
  })

  return {
    fallback: false,
    paths: items.map(itemID => ({
      params: { itemID },
    })),
  }
}
