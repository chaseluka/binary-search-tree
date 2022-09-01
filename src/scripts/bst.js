/* eslint-disable max-classes-per-file */
class Node {
  constructor(value, left, right) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(array) {
    this.array = this.mergeSort(array);
    this.list = this.buildTree(this.array, 0, this.array.length - 1);
    this.root = this.list.value;
  }

  insert(value) {
    let node = this.list;
    while (node.value !== value && Number.isNaN(node) === false) {
      if (value > node.value) {
        if (node.right === null) node.right = new Node(value, null, null);
        node = node.right;
      } else {
        if (node.left === null) node.left = new Node(value, null, null);
        node = node.left;
      }
    }
  }

  hasChildren(node) {
    let children = false;
    if (node.right !== null && node.left !== null) children = 2;
    else if (node.right !== null || node.left !== null) children = 1;
    return children;
  }

  findNext(startNode) {
    let node = startNode;
    while (node.left !== null) {
      node = node.left;
    }
    return node;
  }

  delete(value, isParent) {
    let node = this.list;
    let parent = null;
    let direction = null;
    while (node !== null && node.value !== value && Number.isNaN(node) === false) {
      if (value > node.value) {
        direction = 'right';
        parent = node;
        node = node.right;
      } else {
        direction = 'left';
        parent = node;
        node = node.left;
      }
    }
    if (node === null || Number.isNaN(node) === true) return 'Error';
    if (node.value === this.root) {
      if (!this.hasChildren(node)) {
        this.list = null;
        this.root = null;
      } else if (this.hasChildren(node) === 1) {
        if (node.left !== null) {
          this.list = node.left;
          this.root = node.left.value;
        } else {
          this.list = node.right;
          this.root = node.right.value;
        }
        node = null;
      } else if (this.hasChildren(node) === 2) {
        const replacementNode = this.findNext(node.right);
        replacementNode.right = this.delete(replacementNode.value, node);
        replacementNode.left = node.left;
        this.list = replacementNode;
        this.root = replacementNode.value;
        node = null;
      }
    } else if (node.value !== this.root) {
      if (!this.hasChildren(node)) {
        if (direction === 'right') parent.right = null;
        else parent.left = null;
      } else if (this.hasChildren(node) === 1) {
        if (node.left !== null) {
          if (direction === 'right') parent.right = node.left;
          else parent.left = node.left;
        } else if (direction === 'right') parent.right = node.right;
        else parent.left = node.right;
      } else if (this.hasChildren(node) === 2) {
        const replacementNode = this.findNext(node.right);
        replacementNode.right = this.delete(replacementNode.value, node);
        replacementNode.left = node.left;
        if (direction === 'right') parent.right = replacementNode;
        else parent.left = replacementNode;
      }

      if (isParent.value === parent.value) return parent.right;
      return parent;
    }
  }

  find(value) {
    let node = this.list;
    while (node !== null && node.value !== value && Number.isNaN(node) === false) {
      if (value > node.value) {
        node = node.right;
      } else {
        node = node.left;
      }
    }
    if (node === null || Number.isNaN(node) === true) return 'Error';
    return node;
  }

  levelOrder() {
    const queue = [];
    const order = [];
    const node = this.list;
    queue.push(node);

    while (queue.length > 0) {
      const firstNode = queue.shift();
      order.push(firstNode.value);
      if (firstNode.left !== null) queue.push(firstNode.left);
      if (firstNode.right !== null) queue.push(firstNode.right);
    }
    return order;
  }

  preorder(node) {
    if (node == null) return [];
    const order = [];
    order.push(node.value);

    const leftTree = this.preorder(node.left);
    const rightTree = this.preorder(node.right);

    order.push(...leftTree);
    order.push(...rightTree);

    return order;
  }

  inorder(node) {
    if (node == null) return [];
    const order = [];

    const leftTree = this.inorder(node.left);
    order.push(...leftTree);

    order.push(node.value);

    const rightTree = this.inorder(node.right);
    order.push(...rightTree);

    return order;
  }

  postorder(node) {
    if (node == null) return [];
    const order = [];

    const leftTree = this.postorder(node.left);
    order.push(...leftTree);

    const rightTree = this.postorder(node.right);
    order.push(...rightTree);

    order.push(node.value);

    return order;
  }

  height(node) {
    let count = 0;
    if (node == null) return 0;
    if (node.left !== null || node.right !== null) count += 1;

    const leftSize = this.height(node.left);
    const rightSize = this.height(node.right);

    if (leftSize >= rightSize) count += leftSize;
    else count += rightSize;
    return count;
  }

  depth(node) {
    let traversingNode = this.list;
    let depth = 0;
    while (node !== null && traversingNode.value !== node.value && !Number.isNaN(node.value)) {
      if (node.value > traversingNode.value) {
        traversingNode = traversingNode.right;
        depth += 1;
      } else {
        traversingNode = traversingNode.left;
        depth += 1;
      }
    }
    return depth;
  }

  isBalanced() {
    if (this.list.left !== null && this.list.right !== null) {
      const leftHeight = this.height(this.list.left);
      const rightHeight = this.height(this.list.right);
      if (leftHeight - rightHeight <= 1 && rightHeight - leftHeight <= 1) return true;
    } else if (this.list.left !== null && !this.height(this.list.left) > 0) return true;
    else if (this.list.right !== null && !this.height(this.list.right) > 0) return true;
    return false;
  }

  rebalance() {
    if (!this.isBalanced()) {
      const newTree = this.inorder(this.list);
      this.arry = newTree;
      this.list = this.buildTree(newTree, 0, newTree.length - 1);
      this.root = this.list.value;
    }
  }

  mergeSort(array) {
    if (array.length < 2) return array;
    const half = Math.ceil(array.length / 2);
    const leftHalf = array.splice(0, half);
    const rightHalf = array;
    const sortLeft = this.mergeSort(leftHalf);
    const sortRight = this.mergeSort(rightHalf);
    const sortedArray = [];
    while (sortLeft !== [] || sortRight !== []) {
      if (sortLeft[0] === undefined) {
        sortedArray.push(...sortRight);
        break;
      }
      if (sortRight[0] === undefined) {
        sortedArray.push(...sortLeft);
        break;
      } else if (sortLeft[0] === sortRight[0]) {
        sortedArray.push(...sortLeft.splice(0, 1));
        sortRight.splice(0, 1);
      } else {
        const smlNum = sortLeft[0] < sortRight[0] ? sortLeft.splice(0, 1) : sortRight.splice(0, 1);
        sortedArray.push(...smlNum);
      }
    }
    return sortedArray;
  }

  buildTree(array, start, end) {
    if (start > end) return null;
    const mid = Math.ceil((start + end) / 2);
    const leftChildren = this.buildTree(array, start, mid - 1);
    const rightChildren = this.buildTree(array, mid + 1, end);
    const newNode = new Node(array[mid], leftChildren, rightChildren);
    return newNode;
  }
}

export default Tree;
