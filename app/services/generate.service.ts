import { Service } from "typedi";
import prisma from "../helpers/prisma.client";
import cc from 'coupon-code';
import numeral from "numeral";

export interface GenerationInterface {
	count: number;
	value: number;
}

@Service()
export class GenerateService {
	async generateCards(info: GenerationInterface) {
		const existingCardsCount = await prisma.giftCard.count();
		let records = [];
		for (let n = 1; n <= info.count; ++n) {
			records[records.length] = {
				cardValue: info.value,
				cardCode: `${numeral(existingCardsCount + n).format('00000')}-${cc.generate({ parts: 3, partLen: 5 })}`,
			};
		}
		return await prisma.giftCard.createMany({
			data: records
		})
	}
}
