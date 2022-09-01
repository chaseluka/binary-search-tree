/* eslint-disable operator-linebreak */
import Tree from '../scripts/bst';

describe('merge sort tests', () => {
  const tree = new Tree([1, 2, 3]);
  it('merge sort an array', () => {
    expect(tree.mergeSort([1, 2, 3])).toStrictEqual([1, 2, 3]);
  });
  it('removes duplicates on sort', () => {
    expect(tree.mergeSort([2, 2, 4, 7, 1, 5])).toStrictEqual([1, 2, 4, 5, 7]);
  });
});
describe('buildTree function working correclty', () => {
  it('tree is built with small array', () => {
    const tree = new Tree([1, 2, 3]);
    expect(tree.list.left.value === 1 && tree.list.right.value === 3).toBe(true);
  });
  it('build tree correctly if array is out of order', () => {
    const test = new Tree([3, 2, 1]);
    expect(test.list.left.value === 1 && test.list.right.value === 3).toBe(true);
  });
  const biggerTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
  it('get tree by getting root of tree class', () => {
    expect(biggerTree.root).toBe(4);
  });
  it('tree is built with a larger array', () => {
    expect(
      biggerTree.list.left.value === 2 && //
        biggerTree.list.left.left.value === 1 &&
        biggerTree.list.left.right.value === 3 &&
        biggerTree.list.right.value === 6 &&
        biggerTree.list.right.left.value === 5 &&
        biggerTree.list.right.right.value === 7,
    ).toBe(true);
  });
});
describe('insert a value into tree', () => {
  const tree = new Tree([2, 3, 4, 5, 6, 7, 8]);
  it('if value exists already dont do anything', () => {
    const listBefore = tree.list;
    tree.insert(7);
    expect(tree.list).toBe(listBefore);
  });
  it('insert a higher value into list', () => {
    tree.insert(9);
    expect(tree.list.right.right.right.value).toBe(9);
  });
  it('insert a lower value into list', () => {
    tree.insert(1);
    expect(tree.list.left.left.left.value).toBe(1);
  });
});
describe('delete a value from the tree', () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6]);
  it('delete a value that has no children', () => {
    tree.delete(3, false);
    expect(tree.list.left.right).toBe(null);
  });
  it('delete a value that has one child assinging children to parent', () => {
    tree.delete(5, false);
    expect(tree.list.right.value).toBe(6);
  });
  const newTree = new Tree([1, 2, 5, 6]);
  it('delete a value that has two children assinging children to parent', () => {
    newTree.insert(3);
    newTree.insert(4);
    newTree.delete(2, false);
    const root = newTree.list.left.value === 3;
    const rootLeft = newTree.list.left.left.value === 1;
    const rootRight = newTree.list.left.right.value === 4;
    expect(root && rootLeft && rootRight).toBe(true);
  });

  it('delete a value that has two children assinging children to parent in a large list', () => {
    const bigTree = new Tree([20, 30, 32, 34, 36, 40, 50, 60, 65, 70, 75, 80, 85]);
    bigTree.delete(34, false);
    bigTree.insert(38);
    const root = bigTree.list.left.value === 36;
    const rootLeft = bigTree.list.left.left.value === 30;
    const rootRight = bigTree.list.left.right.value === 40;
    expect(root && rootLeft && rootRight).toBe(true);
  });
  it('delete root node with no children', () => {
    const rootOnly = new Tree([2]);
    rootOnly.delete(2, false);
    expect(rootOnly.list).toBe(null);
  });
  it('delete root node with one child', () => {
    const rootOne = new Tree([1, 2]);
    rootOne.delete(2, false);
    expect(rootOne.root).toBe(1);
  });
  it('delete root node with two children', () => {
    const rootTwo = new Tree([1, 2, 3]);
    rootTwo.delete(2, false);
    expect(rootTwo.list.value).toBe(3);
  });
  it('value to delete isnt in list', () => {
    const rootTwo = new Tree([1, 2, 3]);
    const listBefore = rootTwo.list;
    rootTwo.delete(8, false);
    expect(rootTwo.list).toBe(listBefore);
  });
});
describe('find values', () => {
  const tree = new Tree([1, 2, 3, 4, 5, 6, 7]);
  it('find a value in tree', () => {
    expect(tree.find(2).value).toBe(tree.list.left.value);
  });
  it('return error if value isnt in tree', () => {
    expect(tree.find(9)).toBe('Error');
  });
  it('return error if argument isnt a value', () => {
    expect(tree.find('No value here')).toBe('Error');
  });
});
describe('level order', () => {
  const tree = new Tree([1, 2, 3]);
  it('gets correct order with a small tree', () => {
    expect(tree.levelOrder()).toStrictEqual([2, 1, 3]);
  });
  const bigTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  it('get correct order with a big tree', () => {
    expect(bigTree.levelOrder()).toStrictEqual([7, 4, 10, 2, 6, 9, 12, 1, 3, 5, 8, 11]);
  });
});
describe('preorder, inorder, and postorder functions', () => {
  const tree = new Tree([1, 2, 3]);
  it('preorder gets correct order with a small tree', () => {
    expect(tree.preorder(tree.list)).toStrictEqual([2, 1, 3]);
  });
  const bigTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  it('preorder get correct order with a big tree', () => {
    expect(bigTree.preorder(bigTree.list)).toStrictEqual([7, 4, 2, 1, 3, 6, 5, 10, 9, 8, 12, 11]);
  });
  it('inorder gets correct order with a small tree', () => {
    expect(tree.inorder(tree.list)).toStrictEqual([1, 2, 3]);
  });
  it('inorder get correct order with a big tree', () => {
    expect(bigTree.inorder(bigTree.list)).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });
  it('postorder gets correct order with a small tree', () => {
    expect(tree.postorder(tree.list)).toStrictEqual([1, 3, 2]);
  });
  it('postorder get correct order with a big tree', () => {
    expect(bigTree.postorder(bigTree.list)).toStrictEqual([1, 3, 2, 5, 6, 4, 8, 9, 11, 12, 10, 7]);
  });
});
describe('height of tree', () => {
  const tree = new Tree([1, 2]);
  it('get height of a one edge tree', () => {
    expect(tree.height(tree.list)).toBe(1);
  });
  it('get height of a tree with one edge on each side', () => {
    tree.insert(3);
    expect(tree.height(tree.list)).toBe(1);
  });
  const mediumTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
  it('get height of a tree with two edges', () => {
    expect(mediumTree.height(mediumTree.list)).toBe(2);
  });
  it('get height of a tree with a long edge', () => {
    const longTree = new Tree([7]);
    longTree.insert(6);
    longTree.insert(5);
    longTree.insert(4);
    longTree.insert(3);
    longTree.insert(2);
    expect(longTree.height(longTree.list)).toBe(5);
  });
  const bigTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  it('get height of a tree with multiple edges', () => {
    bigTree.insert(13);
    bigTree.insert(14);
    expect(bigTree.height(bigTree.list)).toBe(4);
  });
  it('height is zero when no branches exist', () => {
    const noBranches = new Tree([2]);
    expect(noBranches.height(noBranches.list)).toBe(0);
  });
});
describe('depth of a node', () => {
  const tree = new Tree([1, 2]);
  it('get depth of a node in a tree with one edge', () => {
    expect(tree.depth(tree.list.left)).toBe(1);
  });
  it('get depth of a node in a tree with one edge on each side', () => {
    tree.insert(3);
    expect(tree.depth(tree.list.right)).toBe(1);
  });
  const mediumTree = new Tree([1, 2, 3, 4, 5, 6, 7]);
  it('get depth of a tree with two edges', () => {
    expect(mediumTree.depth(mediumTree.list.left.left)).toBe(2);
  });
  it('get depth of a node far from root', () => {
    const longTree = new Tree([7]);
    longTree.insert(6);
    longTree.insert(5);
    longTree.insert(4);
    longTree.insert(3);
    longTree.insert(2);
    expect(longTree.depth(longTree.list.left.left.left.left.left)).toBe(5);
  });
  const bigTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  it('get depth of a node in a tree with multiple edges', () => {
    bigTree.insert(13);
    bigTree.insert(14);
    const fourteen = bigTree.depth(bigTree.list.right.right.right.right) === 4;
    const five = bigTree.depth(bigTree.list.left.right.left) === 3;
    expect(fourteen && five).toBe(true);
  });
  it('depth is zero when no branches exist', () => {
    const noBranches = new Tree([2]);
    expect(noBranches.depth(noBranches.list)).toBe(0);
  });
});
describe('is a tree balanced?', () => {
  const tree = new Tree([2, 3]);
  it('a tree is balanced with one additional node', () => {
    expect(tree.isBalanced()).toBe(true);
  });
  it('a tree is not balanced with two additional node', () => {
    tree.insert(1);
    expect(tree.isBalanced()).toBe(false);
  });
  const newTree = new Tree([1, 2, 3]);
  it('a tree is balanced with a node on each side', () => {
    expect(newTree.isBalanced()).toBe(true);
  });
  const bigTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  it('a large tree is balanced', () => {
    expect(bigTree.isBalanced()).toBe(true);
  });
  it('a large tree is not balanced', () => {
    bigTree.insert(13);
    bigTree.insert(14);
    bigTree.insert(15);
    expect(bigTree.isBalanced()).toBe(false);
  });
});
describe('rebalance an unbalanced tree', () => {
  const tree = new Tree([2, 3]);
  it('reblance a tree with two additional nodes', () => {
    tree.insert(1);
    const before = tree.list;
    tree.rebalance();
    expect(tree.list !== before && tree.root === 2).toBe(true);
  });
  const newTree = new Tree([1, 2, 3]);
  it('a balanced tree doesnt do anything', () => {
    const before = newTree;
    newTree.rebalance();
    expect(newTree.list !== before).toBe(true);
  });
  const bgTree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  it('a large unbalanced tree is rebalanced', () => {
    bgTree.insert(13);
    bgTree.insert(14);
    bgTree.insert(15);
    const before = bgTree.list;
    bgTree.rebalance();
    const noMatch = bgTree.list !== before;
    const balanced = bgTree.isBalanced();
    const root = bgTree.root === 8;
    expect(noMatch && balanced && root).toBe(true);
  });
});
