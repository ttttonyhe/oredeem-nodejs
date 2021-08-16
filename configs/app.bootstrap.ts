import { print } from "../utilities/print";
import dotenv from "dotenv";

export const bootstrap = () => {
	const loadResult = dotenv.config();
	if (!loadResult.error) {
		print.success("Environment variable loaded: /.env");
	} else {
		print.error("Environment variable failed to load: /.env");
	}
};
