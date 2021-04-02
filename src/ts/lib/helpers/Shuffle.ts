class Shuffle {
	fisherYates(a: Array<any>): Array<any> {
		for (let i: number = a.length - 1; i > 0; i--) {
			const j: number = Math.floor(Math.random() * (i + 1));
			[
				a[i],
				a[j]
			] = [
				a[j],
				a[i]
			];
		}
		return a ;
	}
}

export default Shuffle;
