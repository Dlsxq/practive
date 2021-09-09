


interface WorkElement {
	handle: () => Promise<any>
	success?: any
	fial?: any
}

let i = 0;
let que = [] as WorkElement[];
async function exec() {
	while (que.length > 0) {
		let cur = que.shift();
		try {
			i+=1;
			let r = await cur.handle()
			cur.success(r)
		} catch (err) {
			cur.fial(err)
		} finally {
			i-=1;
		}
	}
}
const requestPull = (work: WorkElement) => {
	return new Promise((resolve, reject) => {
		if (i > 3 || que.length > 0) { // 顺序执行
			work.success = resolve;
			work.fial = reject;
			que.push(work)
			exec()
			return
		}
		i += 1;
		work.handle().then(r => {
			resolve(r)
		})
			.finally(() => {
				i -= 1;
			})
	})
}