import {
	BadRequestError,
	Post,
	JsonController,
	Body,
} from "routing-controllers";
import { Service } from "typedi";
import { DeleteService } from "../services/delete.service";
import { DeletionInterface } from "../services/delete.service";

@JsonController()
@Service()
export class ManageController {
	constructor(private deleteService: DeleteService) { }

	@Post("/delete")
	async delete(
		@Body() info: DeletionInterface
	) {

		// validate card cuid
		if (!info.cardCuid || info.cardCuid.length != 25) {
			throw new BadRequestError("Invalid card cuid");
		}

		const deletedCard = await this.deleteService.deleteCard(info);

		if (!deletedCard) {
			return JSON.stringify({
				status: false,
				msg: "Failed to delete card"
			})
		} else {
			return JSON.stringify({
				status: true,
				msg: "Deletion complete"
			})
		}
	}

	@Post("/bulkDelete")
	async bulkDelete(@Body() info: {
		redeemed: boolean
	}) {
		const deletedCard = await this.deleteService.bulkDelete(info.redeemed);

		if (!deletedCard.count) {
			return JSON.stringify({
				status: false,
				msg: "没有卡被删除"
			})
		} else {
			return JSON.stringify({
				status: true,
				count: deletedCard.count,
				msg: `${deletedCard.count} 张充值卡已被删除`
			})
		}
	}
}
