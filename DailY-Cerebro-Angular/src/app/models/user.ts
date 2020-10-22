import { Game } from './Game';
import { Role } from './Role';
import { Stat } from './Stat';

export class User{

	public iD: number;
	public username: string;
	public email: string;
	public password: string;

	public role: Role;
	public stat: Stat;
	public game: Game;

	constructor($username: string, $email: string, $password: string) {
		this.username = $username;
		this.email = $email;
		this.password = $password;
	}

}
