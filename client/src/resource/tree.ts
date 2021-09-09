
interface TreeNodeImpl<T> {
	val: T;
	left: TreeNodeImpl<T> | null;
	right: TreeNodeImpl<T> | null;
	parent: TreeNodeImpl<T> | null;
	weight: number;

	height: number
	df: number

	info?: any;
}

/**
 * 二叉树 根据权重来排序
 */
interface BinartTreeImpl<T> {
	root: TreeNodeImpl<T> | null;
	/**
	 * max - 树中最大的值
	 */
	max: T;
	/**
	 * min - 书中最小的值
	 */
	min: T;
	/**
	 * insert - 新加入一个节点
	 * @param val  - 新加节点存储的值
	 * @param weight  - 新加入节点的权重
	 */
	insert(val: T, weight: number): void;
	/**
	 * searchKey - 按照key值查找val
	 * @param weight - 权重值
	 */
	searchkey(weight: number): T | null;
	/**
	 * deleteAtKey - 按照key值删除一个节点
	 */
	deleteAtKey(key: number): boolean;
	/**
	 * prevEach 前序遍历
	 * @param handler - 对节点的处理
	 */
	prevEach(handler: Function): void;
	/**
	 * inorderTraversal 中序遍历
	 * @param handler - 对节点的处理
	 */
	inorderTraversal(handler: Function): void;
	/**
	 * postorderTraversal 后续遍历
	 * @param handler - 对节点的处理
	 */
	postorderTraversal(handler: Function): void;

	/**
	 * levelEach 层序遍历
	 * @param handler - 对节点的处理
	 */
	levelEach(handler: Function): void;

	/**
	 * display 显示出所有节点, 格式化打印
	 */
	displayFormatTree(): string;
}
/*
func isBalanced(root *TreeNode) bool {
	if root == nil {
			return true
	}
	left := getHeight(root.Left)
	right:= getHeight(root.Right)

	if left - right > 1 || right - left > 1 {
			return false
	}
	l, r := isBalanced(root.Left), isBalanced(root.Right)
	return l && r
}

func getHeight(root *TreeNode) int {
	if root == nil {
			return 0
	}
	l := getHeight(root.Left)
	r := getHeight(root.Right)
	return max(l, r) + 1
}


func max(x, y int) int {
	if x > y {
			return x
	}
	return y
}
*/


class TreeNode<T> implements TreeNodeImpl<T> {
	val: T;
	info?: any;
	weight: number;
	left: TreeNode<T> = null;
	right: TreeNode<T> = null;
	parent: TreeNode<T> = null;
	df: number = 0;
	height: number;

	constructor(val: T) {
		this.val = val;
	}
}

enum balance {
	right = -1,
	center = 0,
	left = 1
}
function getNodeHeight<T>(root: TreeNodeImpl<T>): number {
	if (root === null) {
		return 0
	}
	let lh = getNodeHeight(root.left);
	let rh = getNodeHeight(root.right);
	return Math.max(lh, rh) + 1;
}

function setNodeBf<T>(root: TreeNodeImpl<T>) {
	if (root === null) {
		return
	}
	let lh = getNodeHeight(root.left);
	let rh = getNodeHeight(root.right);
	root.df = lh - rh;
	if (root.left !== null) {
		root.left.height = lh;
	}
	if (root.right !== null) {
		root.right.height = rh;
	}
	setNodeBf(root.left);
	setNodeBf(root.right);
}

function rightRotate<T>(child: TreeNodeImpl<T>): TreeNodeImpl<T> {
	// 1. 将调整节点的右子节点替换现在的位置
	let left = child.left;
	child.left = left.right;
	left.right = child;
	if (child.parent !== null) {
		child.parent.right = left;
	}
	left.parent = child.parent;
	left.height = getNodeHeight(left)
	child.height = getNodeHeight(child)
	return left;
}


function leftRotate<T>(child: TreeNodeImpl<T>): TreeNodeImpl<T> {
	let right = child.right;
	child.right = right.left;
	if (child.parent !== null) {
		child.parent.left = right;
	}
	right.parent = child.parent;
	right.height = getNodeHeight(right);
	child.height = getNodeHeight(child);
	return child;
}

/*
	1. 计算树高
	2. 计算平衡因子
	3. 开始旋转
*/

class BinaryTree<T extends number> implements BinartTreeImpl<T>{
	root: TreeNodeImpl<T> = null;

	get max(): T {
		let curr = this.root;
		while (curr !== null && curr.right !== null) {
			curr = curr.right
		}
		return curr.val;
	}

	get min(): T {
		let curr = this.root;
		while (curr !== null && curr.left !== null) {
			curr = curr.left
		}
		return curr.val;
	}

	private insertHelper(root: TreeNodeImpl<T>, node: TreeNode<T>) {
		let current = root, isLeft = true, parent = root;
		while (current !== null) {
			parent = current;
			if (current.weight > node.weight) {
				current = current.left;
				isLeft = true;
			} else {
				current = current.right;
				isLeft = false;
			}
		}
		if (isLeft) {
			parent.left = node;
		} else {
			parent.right = node;
		}
		// parent.df = bf;
		node.parent = parent;
	}

	insert(val: T, weight: number): void {
		let node = new TreeNode(val);
		node.weight = weight;
		if (this.root === null) {
			node.height = 0;
			node.df = 0;
			this.root = node;
			return
		}
		// 开始插入
		this.insertHelper(this.root, node);
		setNodeBf(this.root)
		while (node.parent !== null) {
			if (node.df >= 2) {
				node = rightRotate(node);
				setNodeBf(node);
				continue;
			}
			if (node.df < -1) {
				node = leftRotate(node);
				setNodeBf(node);
				continue;
			}
			node = node.parent;
		}
		// 是否是avl树
		// 从node 叶子节点向上找，找到第一个最小的不平衡子树
	}

	searchkey(weight: number): T {
		let curr = this.root;
		while (curr !== null) {
			if (curr.weight < weight) {
				curr = curr.right;
			} else if (curr.weight > weight) {
				curr = curr.left;
			} else {
				return curr.val;
			}
		}
		return null;
	}

	deleteAtKey(key: number) {

		let currentNode = this.root;
		let parent = currentNode;
		let isLeft = true;
		while (currentNode !== null && currentNode.weight !== key) {
			parent = currentNode;
			if (currentNode.weight > key) {
				currentNode = currentNode.left;
				isLeft = true;
			} else {
				currentNode = currentNode.right;
				isLeft = false;
			}
		}
		if (currentNode === null) return false;
		// 1. 删除叶子结点
		if (
			currentNode.left === null &&
			currentNode.right === null
		) {
			if (isLeft) {
				parent.left = null;
			} else {
				parent.right = null;
			}
			return true;
		}
		// 2. 删除根节点
		if (this.root === currentNode) {
			if (this.root.right === null && this.root.left === null) {
				this.root = null;
				return true;
			}
			if (currentNode.right !== null) {
				let curr = currentNode.right;
				let nextParent = parent;
				while (curr !== null && curr.left !== null) {
					nextParent = curr;
					curr = curr.left;
				}
				nextParent.left = null;
				curr.left = currentNode.left;
				curr.right = currentNode.right;
				this.root = curr;
				return true;
			}
			this.root = currentNode.left;
			return true;
		}
		// 3. 删除中间节点
		if (currentNode.left !== null && currentNode.right !== null) {
			let nextParent = null;
			if (isLeft) {
				let curr = currentNode.right;
				while (curr.left !== null) {
					nextParent = curr;
					curr = curr.left;
				}
				if (nextParent !== null) {
					nextParent.left = null;
				}
				curr.left = currentNode.left;
				if (curr !== currentNode.right) {
					curr.right = currentNode.right;
				}
				parent.left = curr;
				return true;
			}
			let curr = currentNode.left;
			while (curr !== null && curr.right !== null) {
				nextParent = curr;
				curr = curr.right;
			}
			if (nextParent !== null) {
				nextParent.right = null
			}
			curr.right = currentNode.right;
			if (currentNode.left !== curr) {
				curr.left = currentNode.left;
			}
			parent.right = curr;
			return true;
		}

		if (isLeft) {
			parent.left = currentNode.left;
			return true;
		}
		parent.right = currentNode.right;
		return true;
	}


	displayFormatTree(): string {
		let collist = [];
		let p = 0;
		this.levelEach(row => {
			collist.push(row)
		})
		let res = `\t`;
		let createRowStr = (row) => `[w:${row.weight}|value:${row.value}]`
		let i = 0, len = collist.length;
		while (i < len) {
			let rows = collist[i] as any[];
			let temp = ``;
			for (let j = 0; j < rows.length; j++) {
				if (p > 100) return "";
				let el = rows[j];
				temp += `${createRowStr(el)}\t`
				p++
			}

			res += "\t".repeat(len - i) + temp + "\t".repeat(len - i) + "\n";
			i++;
		}
		console.log(res);
		return res;
	}


	prevEach(handler: Function): void {
		let stack = [this.root];
		while (stack.length > 0) {
			let curr = stack.pop();
			handler(curr.val);
			if (curr.right !== null) {
				stack.push(curr.right)
			}
			if (curr.left !== null) {
				stack.push(curr.left)
			}
		}
	}
	inorderTraversal(handler: Function): void {
		let stack = [];
		let curr = this.root;
		while (curr !== null || stack.length > 0) {
			while (curr !== null) {
				stack.push(curr);
				curr = curr.left
			}
			let temp = stack.pop();
			handler(temp.val);
			curr = temp.right;
		}
	}
	postorderTraversal(handler: Function): void {
		let stack = [this.root];
		while (stack.length > 0) {
			let curr = stack.pop();
			handler(curr.val);
			if (curr.left !== null) {
				stack.push(curr.left)
			}
			if (curr.right !== null) {
				stack.push(curr.right)
			}
		}
	}

	levelEach(handler: Function): void {
		let queue = [this.root];
		while (queue.length > 0) {
			let len = queue.length;
			let temp = [];
			while (len > 0) {
				let curr = queue.shift();
				temp.push({ weight: curr.weight, value: curr.val })
				if (curr.left !== null) {
					queue.push(curr.left)
				}
				if (curr.right !== null) {
					queue.push(curr.right)
				}
				len--;
			}
			handler(temp)
		}
	}
}

const tree = new BinaryTree<number>();


// tree.insert(10, 10)
// tree.insert(7, 7)
// tree.insert(17, 17)
// tree.insert(11152, 15)
// tree.insert(23, 23)
// tree.insert(18, 18)

tree.insert(21, 21)
tree.insert(13, 13)
tree.insert(19, 19)
tree.insert(5, 5)

tree.insert(75, 75)
tree.insert(64, 64)
tree.insert(37, 37)

console.log(tree);




