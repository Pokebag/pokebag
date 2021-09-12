export function sortVersions(versionA, versionB) {
	const versionArrayA = versionA.split('.')
	const versionArrayB = versionB.split('.')

	const vA = Number(versionArrayA.shift())
	const vB = Number(versionArrayB.shift())

	if (vA > vB) return 1

	if (vA < vB) return -1

	if (!versionArrayA.length && !versionArrayB.length) return 0

	return sortVersions(versionArrayA.join('.'), versionArrayB.join('.'))
}
