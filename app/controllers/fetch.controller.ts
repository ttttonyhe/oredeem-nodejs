import { Get, JsonController } from "routing-controllers";
import { Service } from "typedi";
import { FetchService } from "../services/fetch.service";

@JsonController()
@Service()
export class FetchController {
	constructor(private fetchService: FetchService) { }

	@Get("/redeemed")
	async fetchRedeemedCards() {
		return this.fetchService.fetchRedeemed();
	}

	@Get("/unredeemed")
	async fetchUnRedeemedCards() {
		return this.fetchService.fetchUnRedeemed();
	}

	@Get("/redemption")
	async fetchRedemption() {
		return this.fetchService.fetchRedemption();
	}
}
