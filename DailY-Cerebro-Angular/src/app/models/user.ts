import { Game } from './Game';
import { Role } from './Role';
import { Stat } from './Stat';

export class User{

	private id: number;
	private username: string;
	private mail: string;
	private password: string;

	private role: Role;
	private stat: Stat;
	private game: Game;

	constructor($id: number, $username: string, $mail: string, $password: string) {
		this.id = $id;
		this.username = $username;
		this.mail = $mail;
		this.password = $password;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $username
     * @return {string}
     */
	public get $username(): string {
		return this.username;
	}

    /**
     * Getter $mail
     * @return {string}
     */
	public get $mail(): string {
		return this.mail;
	}

    /**
     * Getter $password
     * @return {string}
     */
	public get $password(): string {
		return this.password;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $username
     * @param {string} value
     */
	public set $username(value: string) {
		this.username = value;
	}

    /**
     * Setter $mail
     * @param {string} value
     */
	public set $mail(value: string) {
		this.mail = value;
	}

    /**
     * Setter $password
     * @param {string} value
     */
	public set $password(value: string) {
		this.password = value;
	}

    /**
     * Getter $role
     * @return {Role}
     */
	public get $role(): Role {
		return this.role;
	}

    /**
     * Getter $stat
     * @return {Stat}
     */
	public get $stat(): Stat {
		return this.stat;
	}

    /**
     * Getter $game
     * @return {Game}
     */
	public get $game(): Game {
		return this.game;
	}

    /**
     * Setter $role
     * @param {Role} value
     */
	public set $role(value: Role) {
		this.role = value;
	}

    /**
     * Setter $stat
     * @param {Stat} value
     */
	public set $stat(value: Stat) {
		this.stat = value;
	}

    /**
     * Setter $game
     * @param {Game} value
     */
	public set $game(value: Game) {
		this.game = value;
	}

}
