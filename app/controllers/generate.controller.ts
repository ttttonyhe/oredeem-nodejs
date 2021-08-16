import {
	BadRequestError,
	Post,
	JsonController,
	Body,
} from "routing-controllers";
import { Service } from "typedi";
import { GenerateService } from "../services/generate.service";
import { GenerationInterface } from "../services/generate.service";

@JsonController()
@Service()
export class GenerateController {
	constructor(private generateService: GenerateService) { }

	@Post("/generate")
	async generate(@Body() info: any) {

		// validate card count
		if (!info.count || info.count > 500) {
			throw new BadRequestError("Invalid number of cards");
		}

		// validate card value
		if (!info.value || info.value <= 0) {
			throw new BadRequestError("Invalid card value");
		}

		const generatedCards = await this.generateService.generateCards({
			value: parseInt(info.value),
			count: parseInt(info.count)
		});

		if (!generatedCards.count) {
			return JSON.stringify({
				status: false,
				msg: "没有兑换卡被创建"
			})
		} else {
			return JSON.stringify({
				status: false,
				count: generatedCards.count,
				msg: generatedCards.count + " 张面值 " + info.value + " 的兑换卡被创建"
			})
		}
	}
}
