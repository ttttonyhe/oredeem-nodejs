import {
	BadRequestError,
	Post,
	JsonController,
	Body,
} from "routing-controllers";
import { Service } from "typedi";
import { RedeemableService } from "../services/redeemable.service";
import { RedeemableInterface } from "../services/redeemable.service";

@JsonController()
@Service()
export class RedeemableController {
	constructor(private redeemableService: RedeemableService) { }

	@Post("/delete")
	async delete(@Body() info: RedeemableInterface) {

		// validate status
		if (!info.status || typeof info.status != "boolean") {
			throw new BadRequestError("Invalid status");
		}

		const deletedCard = await this.redeemableService.setRedeemable(info);

		if (!deletedCard) {
			return JSON.stringify({
				status: false,
				msg: "Failed to set redeemable status"
			})
		} else {
			return JSON.stringify({
				status: true,
				msg: "Redeemable status has been set"
			})
		}
	}
}
