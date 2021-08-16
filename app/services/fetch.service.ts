import { Service } from "typedi";
import prisma from "../helpers/prisma.client";

@Service()
export class FetchService {
	async fetchUnRedeemed() {
		return await prisma.giftCard.findMany({
			where: {
				redeemed: false
			},
			select: {
				cuid: true,
				cardCode: true,
				cardValue: true,
				createdAt: true,
				redeemed: true,
			}
		});
	}

	async fetchRedeemed() {
		return await prisma.giftCard.findMany({
			where: {
				redeemed: true
			},
			select: {
				cuid: true,
				cardCode: true,
				cardValue: true,
				createdAt: true,
				redeemed: true,
				redemption: {
					select: {
						phoneNumber: true
					}
				}
			}
		})
	}
}
