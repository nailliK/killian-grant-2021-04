import Cell from "@/ts/lib/interfaces/Cell";
import LooseObject from "@/ts/lib/interfaces/LooseObject";

interface CellNeighbors extends LooseObject {
	tl: Cell,
	t: Cell,
	tr: Cell,
	r: Cell,
	br: Cell,
	b: Cell,
	bl: Cell,
	l: Cell,
}

export default CellNeighbors;
