import { Category } from './category';

export class Game{

	private id: number;
	private name: string;
	private description: string;

	private category: Category;

	constructor($id: number, $name: string, $description: string) {
		this.id = $id;
		this.name = $name;
		this.description = $description;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $name
     * @return {string}
     */
	public get $name(): string {
		return this.name;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $name
     * @param {string} value
     */
	public set $name(value: string) {
		this.name = value;
	}

    /**
     * Setter $description
     * @param {string} value
     */
	public set $description(value: string) {
		this.description = value;
	}

    /**
     * Getter $category
     * @return {Category}
     */
	public get $category(): Category {
		return this.category;
	}

    /**
     * Setter $category
     * @param {Category} value
     */
	public set $category(value: Category) {
		this.category = value;
	}

}
