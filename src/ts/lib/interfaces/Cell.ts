import LooseObject from "@/ts/lib/interfaces/LooseObject";

interface Cell {
	x: number,
	y: number,
	alive: boolean,
	density: number,
	neighbors: LooseObject
}

export default Cell;
