// Local imports
import { createEndpoint } from 'helpers/createEndpoint'
import httpStatus from 'helpers/httpStatus'





export const handler = async (request, response) => {
	response.status(httpStatus.OK).json({
		itemUpgrade: [
			/* lvl 1 */ 	0,
			/* lvl 2 */ 	3,
			/* lvl 3 */ 	4,
			/* lvl 4 */ 	5,
			/* lvl 5 */ 	6,
			/* lvl 6 */ 	8,
			/* lvl 7 */ 	10,
			/* lvl 8 */ 	12,
			/* lvl 9 */ 	14,
			/* lvl 10 */ 	20,
			/* lvl 11 */ 	25,
			/* lvl 12 */ 	30,
			/* lvl 13 */ 	35,
			/* lvl 14 */ 	40,
			/* lvl 15 */ 	45,
			/* lvl 16 */ 	50,
			/* lvl 17 */ 	55,
			/* lvl 18 */ 	60,
			/* lvl 19 */ 	65,
			/* lvl 20 */ 	80,
			/* lvl 21 */ 	100,
			/* lvl 22 */ 	120,
			/* lvl 23 */ 	140,
			/* lvl 24 */ 	160,
			/* lvl 25 */ 	180,
			/* lvl 26 */ 	210,
			/* lvl 27 */ 	240,
			/* lvl 28 */ 	270,
			/* lvl 29 */ 	300,
			/* lvl 30 */ 	300,
		],
		store: {
			aeosCoinBoostCard7Day: {
				aeosGem: 80,
				aeosTicket: 800,
				imageURL: '/images/miscellaneous/7-day-aeos-coin-boost-card.png',
			},
			aeosCoinBoostCard5Day: {
				aeosGem: 35,
				aeosTicket: 350,
				imageURL: '/images/miscellaneous/5-day-aeos-coin-boost-card.png',
			},
			aeosCoinBoostCard3Day: {
				aeosGem: 15,
				aeosTicket: 150,
				imageURL: '/images/miscellaneous/3-day-aeos-coin-boost-card.png',
			},
			battlePointBoostCard7Day: {
				aeosGem: 40,
				aeosTicket: 400,
				imageURL: '/images/miscellaneous/7-day-battle-point-boost-card.png',
			},
			battlePointBoostCard5Day: {
				aeosGem: 20,
				aeosTicket: 200,
				imageURL: '/images/miscellaneous/5-day-battle-point-boost-card.png',
			},
			battlePointBoostCard3Day: {
				aeosGem: 10,
				aeosTicket: 100,
				imageURL: '/images/miscellaneous/3-day-battle-point-boost-card.png',
			},
			energyBoostTank: {
				aeosGem: 50,
				imageURL: '/images/miscellaneous/energy-boost-tank.png',
			},
			energyBoostTank4xSpeed: {
				aeosGem: 200,
				imageURL: '/images/miscellaneous/energy-boost-tank-4x-speed.png',
			},
			extraEnergyTank: {
				aeosGem: 200,
				imageURL: '/images/miscellaneous/extra-energy-tank.png',
			},
			itemEnhancer: {
				aeosGem: 1,
				aeosTicket: 10,
				imageURL: '/images/miscellaneous/item-enhancer.png',
			},
			renameCard: {
				aeosGem: 100,
				imageURL: '/images/miscellaneous/rename-card.png',
			},
		},
	})
}





export default createEndpoint({
	allowedMethods: ['get'],
	handler,
})
