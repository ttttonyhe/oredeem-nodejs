import {
	BadRequestError,
	UnauthorizedError,
	NotFoundError,
	Post,
	JsonController,
	Body,
	InternalServerError,
} from "routing-controllers";
import { Service } from "typedi";
import validator from "validator";
import crypto from "crypto";
import prisma from "../helpers/prisma.client";
import { LoginService } from "../services/login.service";
import { CredentialInterface } from "../services/login.service";

@JsonController()
@Service()
export class LoginController {
	constructor(private loginService: LoginService) { }

	@Post("/login")
	async login(
		@Body() user: CredentialInterface
	) {

		// validate username
		if (
			!user.username ||
			!validator.isLength(user.username, {
				min: 5,
				max: 30,
			})
		) {
			throw new BadRequestError("Invalid username");
		}


		// validate password
		if (
			!user.password ||
			!validator.isLength(user.password, {
				min: 6,
				max: 20,
			})
		) {
			throw new BadRequestError("Password length should be within 6 and 20");
		}

		// get unique user record
		const findResult = await this.loginService
			.find(user)
			.catch(() => {
				throw new InternalServerError("Service temporarily unavailable");
			}).finally(() => {
				prisma.$disconnect();
			})

		// not result is found
		if (!findResult) {
			throw new NotFoundError("User does not exists");
		}

		// sign current password
		const derived_pwd = crypto
			.pbkdf2Sync(user.password, findResult.salt, 400000, 32, "sha256")
			.toString("base64");

		// compare with record password return JWT if matches
		if (findResult.password === derived_pwd) {
			return JSON.stringify({
				status: true,
				message: "success",
				info: {
					id: findResult.id,
					username: findResult.name
				},
				token: this.loginService.sign({
					id: findResult.id,
					username: findResult.name
				}),
			});
		}

		// authentication failed
		throw new UnauthorizedError("Invalid password");
	}
}
