
const normalDistribution = (mean, stdev) => {
	let V1
	let V2
	let S
	do {
		let U1 = Math.random()
		let U2 = Math.random()
		V1 = 2 * U1 - 1
		V2 = 2 * U2 - 1
		S = V1 * V1 + V2 * V2
	} while (S >= 1)
	if (S === 0) return 0
	return mean + stdev * (V1 * Math.sqrt(-2 * Math.log(S) / S))
}


const stochEulerStep = (s, data) => {
	let dT = data.T / data.timesteps;
	let sqdt = Math.sqrt(dT);
	return s + (data.r * s * dT) + (data.Sigma * s * normalDistribution(0, sqdt));
}

const nestList = (f, expr, n) => {
	let list = [];
	for (let i = 0; i < n; i++) {
		let r = i ? f(list[list.length - 1]) : expr;
		list.push(r);
	}
	return list;
}


const stochasticEuler = (data) => {
	let sPath = nestList((s) => stochEulerStep(s, data), data.s, data.timesteps);

/*	console.log(sPath)
	console.log(aS(data, sPath))*/
	return sPath;
}

const aS = (data, sPath) => {
	let sum = 0;
	for (let i = 1; i<sPath.length; i++){
		sum = sPath[i] + sum;
	}
	sum = sum/data.timesteps;
	return sum
}
export const MCAsian = (data) => {
	let sum = 0;
	let a = (1/data.simulations) * Math.exp(-1*data.r * data.T);
	for (let i = 0; i < data.simulations; i++){
		let b = aS(data, stochasticEuler(data)) - data.K;
		if (b > 0){
			sum += b;
		}
	}
	return a * sum;
}

export default stochasticEuler;
