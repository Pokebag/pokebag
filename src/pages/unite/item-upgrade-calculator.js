// Module imports
import {
	useEffect,
	useState,
} from 'react'





// Local imports
import { humanizeNumber } from 'helpers/humanizeNumber'
import { Image } from 'components/Image'
import { Layout } from 'components/Unite/Layout'
import { LevelUpper } from 'components/LevelUpper'
import { RangeSlider } from 'components/RangeSlider'
import { useBreadcrumbs } from 'hooks/useBreadcrumbs'





// Image imports
import AeosGemImage from '../../../public/images/currency/aeos-gem.png'
import AeosTicketImage from '../../../public/images/currency/aeos-ticket.png'
import ItemEnhancerImage from '../../../public/images/miscellaneous/item-enhancer.png'





export default function ItemUpgradeCalculatorPage() {
	const [levels, setLevels] = useState([1, 20])
	const [economy, setEconomy] = useState(null)
	const [isFetchingEconomy, setIsFetchingEconomy] = useState(false)

	useBreadcrumbs([
		{
			label: 'Pokémon UNITE',
			url: '/unite',
		},
		{
			label: 'Item Upgrade Calculator',
			url: '/unite/item-upgrade-calculator',
		},
	])

	useEffect(() => {
		if (!economy && !isFetchingEconomy) {
			setIsFetchingEconomy(true)

			fetch('/api/economy')
				.then(response => response.json())
				.then(response => {
					setEconomy(response)
					setIsFetchingEconomy(false)
				})
		}
	}, [
		economy,
		setEconomy,
		setIsFetchingEconomy,
	])

	let aeosTickets = 10
	let aeosGems = 1
	let itemEnhancers = 0

	if (economy) {
		economy.itemUpgrade
			.slice(Math.min(...levels), Math.max(...levels))
			.forEach(cost => {
				itemEnhancers += cost
			})

		aeosGems = economy.store.itemEnhancer.aeosGem * itemEnhancers
		aeosTickets = economy.store.itemEnhancer.aeosTicket * itemEnhancers
	}

	return (
		<Layout
			description="Use our calculator to figure out how many Item Enhancers you need to upgrade your held items, and how many Aeos tickets or gems that'll cost!"
			subtitle="Calculate the resources you need to upgrade a held item"
			title="Held Item Upgrade Calculator">
			<section className="box section">
				<div className="block">
					<p className="block has-text-centered is-4 title">To upgrade your item from...</p>

					<LevelUpper
						className="level-item"
						levels={levels}
						selectedLevel={Math.max(...levels)} />
				</div>

				<RangeSlider
					displaySteps={[1, 10, 20, 30]}
					hasMarks
					id="upgrade-calculator"
					max={30}
					min={1}
					onChange={setLevels}
					values={levels} />
			</section>

			<section className="box section">
				<p className="block has-text-centered is-4 title">...you will need</p>

				<div className="columns is-vcentered">
					<div className="column is-one-quarter">
						<div className="media">
							<div className="media-left">
								<Image
									height={256}
									size={64}
									src={ItemEnhancerImage}
									width={256} />
							</div>

							<div className="media-content has-text-left">
								<p className="heading">Item Enhancers</p>
								<p className="title">{humanizeNumber(itemEnhancers)}</p>
							</div>
						</div>
					</div>

					<div className="column">
						<p className="content has-text-centered heading title is-5">OR</p>
					</div>

					<div className="column is-one-quarter">
						<div className="media">
							<div className="media-left">
								<Image
									height={199}
									size={64}
									src={AeosTicketImage}
									width={299} />
							</div>
							<div className="media-content">
								<p className="heading">Aeos Tickets</p>
								<p className="title">{humanizeNumber(aeosTickets)}</p>
							</div>
						</div>
					</div>

					<div className="column">
						<p className="content has-text-centered heading title is-5">OR</p>
					</div>

					<div className="column is-one-quarter">
						<div className="media">
							<div className="media-left">
								<Image
									height={252}
									size={64}
									src={AeosGemImage}
									width={251} />
							</div>
							<div className="media-content">
								<p className="heading">Aeos Gems</p>
								<p className="title">{humanizeNumber(aeosGems)}</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	)
}
