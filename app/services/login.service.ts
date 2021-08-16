import { Service } from "typedi";
import prisma from "../helpers/prisma.client";
import jwt from "jsonwebtoken";

export interface CredentialInterface {
	username: string;
	password: string;
}

export interface ProfileInterface {
	id: number;
	username: string;
}

@Service()
export class LoginService {
	async find(user: CredentialInterface) {
		return prisma.user.findUnique({
			where: {
				name: user.username,
			},
		});
	}
	sign(profile: ProfileInterface): string {
		return jwt.sign(profile, process.env.SERVICE_JWT_SECRET, {
			noTimestamp: true,
			expiresIn: "7d",
		});
	}
}
