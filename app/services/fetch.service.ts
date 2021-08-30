import { Service } from "typedi";
import prisma from "../helpers/prisma.client";

@Service()
export class FetchService {
	async fetchUnRedeemed(page: number) {
		return await prisma.giftCard.findMany({
			where: {
				redeemed: false
			},
			select: {
				cuid: true,
				cardCode: true,
				cardPwd: true,
				cardValue: true,
				createdAt: true,
				redeemed: true,
			},
			orderBy: {
				createdAt: "desc"
			},
			skip: page * 25,
			take: 25
		});
	}

	async fetchRedeemed(page: number) {
		return await prisma.giftCard.findMany({
			where: {
				redeemed: true
			},
			select: {
				cuid: true,
				cardCode: true,
				cardPwd: true,
				cardValue: true,
				createdAt: true,
				redeemed: true,
				redemption: {
					select: {
						phoneNumber: true
					}
				}
			},
			orderBy: {
				createdAt: "desc"
			},
			skip: page * 25,
			take: 25
		})
	}

	async fetchRedemption(page: number) {
		return await prisma.redemption.findMany({
			select: {
				cuid: true,
				totalValue: true,
				giftCards: {
					select: {
						cuid: true,
						cardCode: true
					}
				},
				phoneNumber: true,
				manuallyRedeemed: true,
				modifiedAt: true,
			},
			orderBy: {
				createdAt: "desc"
			},
			skip: page * 25,
			take: 25
		})
	}
}
