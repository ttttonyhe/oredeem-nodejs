import { Service } from "typedi";
import prisma from "../helpers/prisma.client";

@Service()
export class FetchService {
	async fetchUnRedeemed() {
		return await prisma.giftCard.findMany({
			where: {
				redeemed: false
			}
		});
	}

	async fetchRedeemed() {
		return await prisma.giftCard.findMany({
			where: {
				redeemed: true
			}
		})
	}
}
