export function humanizeNumber(number, locale = 'en-US') {
	const { format } = new Intl.NumberFormat(locale)
	const [whole, fraction] = number.toString().split('.')

	let humanizedNumber = format(whole)

	if (fraction) {
		humanizedNumber += `.${fraction}`
	}

	return humanizedNumber
}
