import { Get, JsonController, QueryParam } from "routing-controllers";
import { Service } from "typedi";
import { ExportService } from "../services/export.service";

@JsonController()
@Service()
export class ExportController {
	constructor(private exportService: ExportService) { }

	@Get("/exportUnredeemed")
	async exportUnredeemedCards() {
		return this.exportService.exportUnredeemed();
	}

	@Get("/exportRedeemed")
	async exportRedeemedCards() {
		return this.exportService.exportRedeemed();
	}

	@Get("/exportRedemption")
	async exportRedemption() {
		return this.exportService.exportRedemption();
	}
}
