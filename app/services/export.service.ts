import { Service } from "typedi";
import prisma from "../helpers/prisma.client";
import jsonToExcel from "../helpers/json2excel"

@Service()
export class ExportService {
	async exportUnredeemed() {
		const cards = await prisma.giftCard.findMany({
			where: {
				redeemed: false
			},
			select: {
				cardCode: true,
				cardPwd: true,
				cardValue: true,
				createdAt: true,
			},
			orderBy: {
				createdAt: "desc"
			},
		});

		if (cards.length) {

			for (let i = 0; i < cards.length; ++i) {
				cards[i]["redeemUrl"] = `https://oredeem.ouorz.com/redeem/code/${cards[i].cardCode}/pwd/${cards[i].cardPwd}`
			}

			try {
				const fileID = jsonToExcel("未兑换充值卡", cards);
				return JSON.stringify({
					status: true,
					fileID: fileID
				})
			} catch (err) {
				return JSON.stringify({
					status: false,
				})
			}
		} else {
			return JSON.stringify({
				status: false,
			})
		}
	}

	async exportRedeemed() {
		const cards = await prisma.giftCard.findMany({
			where: {
				redeemed: true
			},
			select: {
				cardCode: true,
				cardPwd: true,
				cardValue: true,
				createdAt: true,
				redemption: {
					select: {
						phoneNumber: true
					}
				}
			},
			orderBy: {
				createdAt: "desc"
			}
		})

		if (cards.length) {

			for (let i = 0; i < cards.length; ++i) {
				cards[i]["phoneNumber"] = cards[i].redemption.phoneNumber
			}

			try {
				const fileID = jsonToExcel("已兑换充值卡", cards);
				return JSON.stringify({
					status: true,
					fileID: fileID
				})
			} catch (err) {
				return JSON.stringify({
					status: false,
				})
			}
		} else {
			return JSON.stringify({
				status: false,
			})
		}
	}

	async exportRedemption() {
		const users = await prisma.redemption.findMany({
			select: {
				totalValue: true,
				phoneNumber: true,
				modifiedAt: true,
			},
			orderBy: {
				createdAt: "desc"
			},
		})
		if (users.length) {

			try {
				const fileID = jsonToExcel("兑换记录", users);
				return JSON.stringify({
					status: true,
					fileID: fileID
				})
			} catch (err) {
				return JSON.stringify({
					status: false,
				})
			}
		} else {
			return JSON.stringify({
				status: false,
			})
		}
	}
}
