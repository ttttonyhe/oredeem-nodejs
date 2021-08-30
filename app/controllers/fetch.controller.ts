import { Get, JsonController, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { FetchService } from "../services/fetch.service";

@JsonController()
@Service()
export class FetchController {
	constructor(private fetchService: FetchService) { }

	@Get("/redeemed")
	async fetchRedeemedCards(@QueryParam("page") page: number) {
		return this.fetchService.fetchRedeemed(page);
	}

	@Get("/unredeemed")
	async fetchUnRedeemedCards(@QueryParam("page") page: number) {
		return this.fetchService.fetchUnRedeemed(page);
	}

	@Get("/redemption")
	async fetchRedemption(@QueryParam("page") page: number) {
		return this.fetchService.fetchRedemption(page);
	}
}
