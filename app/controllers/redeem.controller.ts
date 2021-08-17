import {
	BadRequestError,
	NotFoundError,
	Post,
	JsonController,
	Body,
} from "routing-controllers";
import { Service } from "typedi";
import validator from "validator";
import { RedeemService } from "../services/redeem.service";
import { RedeemInfoInterface, ConfirmationInterface } from "../services/redeem.service";

@JsonController()
@Service()
export class RedeemController {
	constructor(private redeemService: RedeemService) { }

	@Post("/redeem")
	async redeem(
		@Body() info: RedeemInfoInterface
	) {

		// validate phoneNumber
		if (!info.phoneNumber || !validator.isMobilePhone(info.phoneNumber, "zh-CN")
		) {
			throw new BadRequestError("Invalid phone number");
		}


		// validate cardCode and cardPwd
		if (!info.cardCode || !info.cardPwd || info.cardCode.length != 23 || info.cardPwd.length != 25) {
			throw new BadRequestError("Invalid card number");
		}

		// get unique card info
		const validationResult = await this.redeemService.validateCard(info)
		if (!validationResult) {
			throw new NotFoundError("Invalid card");
		}

		// update/create redemption record
		const updateResult = await this.redeemService.redeem(info);

		if (!updateResult.redeemed) {
			return JSON.stringify({
				status: false,
				msg: "Failed to redeem"
			})
		} else {
			return JSON.stringify({
				status: true,
				value: updateResult.cardValue
			})
		}
	}

	@Post("/confirm")
	async confirmRedemption(@Body() info: ConfirmationInterface) {
		const result = await this.redeemService.redeemManually(info);

		if (result && result.manuallyRedeemed) {
			return JSON.stringify({
				status: true
			})
		}

		return JSON.stringify({
			status: false
		})
	}
}
