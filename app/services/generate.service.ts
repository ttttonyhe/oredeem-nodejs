import { Service } from "typedi";
import prisma from "../helpers/prisma.client";
import cc from 'coupon-code';

export interface GenerationInterface {
	count: number;
	value: number;
}

@Service()
export class GenerateService {
	async generateCards(info: GenerationInterface) {
		let records = [];
		for (let n = 0; n < info.count; ++n) {
			records[records.length] = {
				cardValue: info.value,
				cardCode: cc.generate({ parts: 4 }),
			};
		}
		return await prisma.giftCard.createMany({
			data: records
		})
	}
}
