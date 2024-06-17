import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';

export interface IUser {
	id?: string;
	email: string;
	password: string;
}

const users: IUser[] = [
	{ id: 'asdfdsasdaf', email: 'enio.goulart@gmail.com', password: 'password' },
];

@Injectable()
export class AuthService {
	constructor(private jwtService: JwtService) {}
	async login(user: Partial<IUser>) {
		const payload = {
			userId: user.id,
			email: user.email,
		};

		const accessToken = this.jwtService.sign(payload);

		return {
			access_token: accessToken,
			refresh_token: accessToken,
		};
	}
	async validateUser({ email, password }: IUser): Promise<Partial<IUser>> {
		const user = users.find(user => user.email === email);
		if (!user) throw new NotFoundException('User not found');

		// const isPasswordValid = await compare(password, password);
		// if (!isPasswordValid)
		// 	throw new BadRequestException('Email or password is incorrect');

		delete user.password;
		return user;
	}
}
