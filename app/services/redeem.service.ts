import { NotFoundError, BadRequestError } from "routing-controllers";
import { Service } from "typedi";
import prisma from "../helpers/prisma.client";

export interface RedeemInfoInterface {
	cardCode: string;
	cardPwd: string;
	phoneNumber: string;
}

export interface ConfirmationInterface {
	redemptionCuid: string;
}

@Service()
export class RedeemService {
	async validateCard(info: RedeemInfoInterface) {
		const cardDetails = await prisma.giftCard.findUnique({
			where: {
				cardCode: info.cardCode
			},
		});
		if (!cardDetails) {
			return false;
		}
		return true;
	}
	// redeem gift card
	async redeem(info: RedeemInfoInterface) {
		// get card details
		const cardDetails = await prisma.giftCard.findFirst({
			where: {
				cardCode: info.cardCode,
				cardPwd: info.cardPwd
			}
		}).catch(() => {
			throw new NotFoundError("Gift card not found");
		})

		if (cardDetails && !cardDetails.redeemed) {
			// get redemption details (if any)
			const redemptionDetail = await prisma.redemption.findUnique({
				where: {
					phoneNumber: info.phoneNumber
				}
			});

			// phone number already exists,
			// 	update redemption value,
			// 	change card to redeemed
			if (redemptionDetail) {
				const updateRedemption = prisma.redemption.update({
					where: {
						cuid: redemptionDetail.cuid
					},
					data: {
						totalValue: redemptionDetail.totalValue + cardDetails.cardValue,
						modifiedAt: new Date()
					}
				})
				const updateCard = prisma.giftCard.update({
					where: {
						cuid: cardDetails.cuid
					},
					data: {
						redeemed: true,
						redemptionCuid: redemptionDetail.cuid
					}
				})

				const result = await prisma.$transaction([updateRedemption, updateCard]).catch(() => {
					throw new BadRequestError("An unexpected error has occurred");
				});

				return result[1];
			}

			// first time to redeem
			// 	create redemption record
			// 	change card to redeemed
			return await prisma.giftCard.update({
				where: {
					cuid: cardDetails.cuid
				},
				data: {
					redeemed: true,
					redemption: {
						create: {
							phoneNumber: info.phoneNumber,
							totalValue: cardDetails.cardValue
						}
					}
				}
			})
		} else {
			throw new NotFoundError("Gift card not found");
		}
	}

	// manually redeem card through cuid
	async redeemManually(info: ConfirmationInterface) {
		return await prisma.redemption.update({
			where: {
				cuid: info.redemptionCuid
			},
			data: {
				manuallyRedeemed: true
			}
		})
	}
}
