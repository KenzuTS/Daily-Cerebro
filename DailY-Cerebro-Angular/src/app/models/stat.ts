export class Stat{

	private id: number;
	private xp: number;

	constructor($id: number, $xp: number) {
		this.id = $id;
		this.xp = $xp;
	}

    /**
     * Getter $id
     * @return {number}
     */
	public get $id(): number {
		return this.id;
	}

    /**
     * Getter $xp
     * @return {number}
     */
	public get $xp(): number {
		return this.xp;
	}

    /**
     * Setter $id
     * @param {number} value
     */
	public set $id(value: number) {
		this.id = value;
	}

    /**
     * Setter $xp
     * @param {number} value
     */
	public set $xp(value: number) {
		this.xp = value;
	}

}
