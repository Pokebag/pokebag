export async function getStatsProps() {
	const [
		fs,
		path,
	] = await Promise.all([
		import('fs/promises'),
		import('path'),
	])

	const statsPath = path.resolve(process.cwd(), 'src', 'data', 'stats.json')
	const stats = JSON.parse(await fs.readFile(statsPath, 'utf8'))

	return {
		props: { stats },
	}
}
