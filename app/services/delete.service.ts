import { Service } from "typedi";
import prisma from "../helpers/prisma.client";

export interface DeletionInterface {
	cardCuid: string;
}

@Service()
export class DeleteService {
	async deleteCard(info: DeletionInterface) {
		return await prisma.giftCard.delete({
			where: {
				cuid: info.cardCuid
			}
		})
	}
	async bulkDelete(redeemed: boolean) {
		// delete redeemed gift card records
		if (redeemed) {
			await prisma.redemption.deleteMany({});

			return await prisma.giftCard.deleteMany({
				where: {
					redeemed: true
				}
			});
		} else {
			// delete all unredeemed gift card records
			return await prisma.giftCard.deleteMany({
				where: {
					redeemed: false
				}
			})
		}
	}
}
