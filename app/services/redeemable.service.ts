import { Service } from "typedi";
import prisma from "../helpers/prisma.client";

export interface RedeemableInterface {
	status: boolean;
}

@Service()
export class RedeemableService {
	async setRedeemable(info: RedeemableInterface) {
		return await prisma.user.update({
			where: {
				id: 1
			},
			data: {
				redeemable: info.status
			}
		})
	}
}
