const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.rightChild !== null) {
    prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.leftChild !== null) {
    prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

class node {
  constructor(data = null, leftChild = null, rightChild = null) {
    this.data = data;
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}

class Tree {
  constructor(inputArr) {
    this.sortedArr = this.prepareArray(inputArr);
    this.root = this.buildTree(this.sortedArr);
  }

  // Sort and remove duplicates from inputed array
  prepareArray(inputArr) {
    const sorted = inputArr.sort();
    const noDuplicates = [];

    for (let i = 0; i < sorted.length; i++) {
      if (sorted[i] !== sorted[i + 1]) {
        noDuplicates.push(sorted[i]);
      }
    }

    return noDuplicates;
  }

  // Build tree with prepared array
  buildTree(inputArr, start = 0, end = inputArr.length - 1) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let newNode = new node(inputArr[mid]);

    newNode.leftChild = this.buildTree(inputArr, start, mid - 1);
    newNode.rightChild = this.buildTree(inputArr, mid + 1, end);

    return newNode;
  }

  // Function to call insert
  insert(key) {
    this.root = this.insertRec(this.root, key);
  }

  // Insert the inputed data to the tree
  insertRec(root, key) {
    if (root === null) {
      root = new node(key);
      return root;
    }

    if (key < root.data) {
      root.leftChild = this.insertRec(root.leftChild, key);
    }
    if (key > root.data) {
      root.rightChild = this.insertRec(root.rightChild, key);
    }

    return root;
  }

  // Call the delete function
  deleteNode(key) {
    this.root = this.delete(this.root, key);
  }

  // Function to delete inputed value
  delete(root, key) {
    if (root === null) return root;

    if (root.data > key) {
      root.leftChild = this.delete(root.leftChild, key);
      return root;
    }
    if (root.data < key) {
      root.rightChild = this.delete(root.rightChild, key);
      return root;
    }

    if (root.leftChild === null) {
      let temp = root.rightChild;
      root = null;
      return temp;
    }
    if (root.rightChild === null) {
      let temp = root.leftChild;
      root = null;
      return temp;
    } else {
      let childParent = root;

      let child = root.rightChild;

      while (child.leftChild !== null) {
        childParent = child;
        child = child.leftChild;
      }

      if (childParent !== root) {
        childParent.leftChild = child.rightChild;
      } else {
        childParent.rightChild = child.rightChild;
      }

      root.data = child.data;

      child = null;
      return root;
    }
  }

  // Call find fucntion
  find(key) {
    this.findRec(this.root, key);
  }

  // Find the node and display it in console
  findRec(root, key) {
    if (root === null) return;

    if (root.data === key) {
      console.log(root);
      return root;
    }
    this.findRec(root.leftChild, key);
    this.findRec(root.rightChild, key);
  }

  // Function to call itterative and recursive method of BFS order
  getBFSArrayOrder() {
    // Itterative Method
    console.log('Itterative method');
    console.log(this.leveleOrderItterative(this.root));
    // Recursive Method
    console.log('Recursive method');
    console.log(this.leveleOrderRecursive(this.root));
  }

  // Itterative BFS order
  leveleOrderItterative(root) {
    const BFSArr = [];
    const queue = [root];

    while (queue.length > 0) {
      const current = queue.shift();

      BFSArr.push(current.data);

      if (current.leftChild !== null) {
        queue.push(current.leftChild);
      }
      if (current.rightChild !== null) {
        queue.push(current.rightChild);
      }
    }

    return BFSArr;
  }

  // Recursive BFS order
  leveleOrderRecursive(root) {
    if (root === null) return [];

    const BFSArr = [];

    const queue = [root];

    function queueKeeper(queue) {
      if (queue.length === 0) return;

      const current = queue.shift();
      BFSArr.push(current.data);

      if (current.leftChild) {
        queue.push(current.leftChild);
      }
      if (current.rightChild) {
        queue.push(current.rightChild);
      }

      queueKeeper(queue);
    }

    queueKeeper(queue);

    return BFSArr;
  }

  // Call inorder recursion
  getInorder() {
    console.log('Inorder method');
    console.log(this.inorderRec(this.root));
  }

  // Call preorder recursion
  getPreorder() {
    console.log('Preorder method');
    console.log(this.preorderRec(this.root));
  }

  // Call postorder recursion
  getPostorder() {
    console.log('Postorder method');
    console.log(this.postorderRec(this.root));
  }

  // Traverse inorder and return the array
  inorderRec(root) {
    const result = [];

    function inorderTraverse(node) {
      if (node === null) return;

      inorderTraverse(node.leftChild);
      result.push(node.data);
      inorderTraverse(node.rightChild);
    }

    inorderTraverse(root);

    return result;
  }

  // Traverse preorder and return the array
  preorderRec(root) {
    const result = [];

    function inorderTraverse(node) {
      if (node === null) return;

      result.push(node.data);
      inorderTraverse(node.leftChild);
      inorderTraverse(node.rightChild);
    }

    inorderTraverse(root);

    return result;
  }

  // Traverse postorder and return the array
  postorderRec(root) {
    const result = [];

    function inorderTraverse(node) {
      if (node === null) return;

      inorderTraverse(node.leftChild);
      inorderTraverse(node.rightChild);
      result.push(node.data);
    }

    inorderTraverse(root);

    return result;
  }

  getTreeHeight() {
    console.log('Tree heigth');
    console.log(this.treeHeight(this.root));
  }

  treeHeight(root) {
    if (root === null) return 0;

    let leftHeight = this.treeHeight(root.leftChild);
    let rightHeight = this.treeHeight(root.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  getNodeDepth(value) {
    console.log('Depth of node');
    console.log(this.nodeDepth(value, this.root, 0));
  }

  nodeDepth(value, root, edgecount) {
    if (root === null) return;
    if (root.data === value) return edgecount;

    if (root.data < value) {
      return this.nodeDepth(value, root.rightChild, edgecount + 1);
    } else {
      return this.nodeDepth(value, root.leftChild, edgecount + 1);
    }
  }

  // Display the tree in console
  displayTree() {
    prettyPrint(this.root);
  }

  checkTreeBalance() {
    this.isBalanced(this.root);
  }

  isBalanced(root) {
    if (root === null) return 0;

    let leftHeight = this.treeHeight(root.leftChild);
    let rightHeight = this.treeHeight(root.rightChild);

    leftHeight += 1;
    rightHeight += 1;

    if (leftHeight - rightHeight === 1 || rightHeight - leftHeight === 1 || leftHeight === rightHeight) {
      console.log('Tree is balanced');
      return true;
    } else {
      console.log('Tree is not balanced');
      return false;
    }
  }

  rebalanceTree() {
    const inorder = this.inorderRec(this.root);
    this.root = this.buildTree(inorder);
  }
}

const newTree = new Tree(createArray());

function createArray() {
  const array = [];

  for (let i = 0; i < 100; i++) {
    const number = Math.floor(Math.random() * 100) + 1;
    array.push(number);
  }

  return array;
}

function testTree() {
  // newTree.displayTree();
  newTree.checkTreeBalance();
  newTree.getInorder();
  newTree.getPostorder();
  newTree.getPreorder();
  newTree.insert(100);
  newTree.insert(101);
  newTree.insert(102);
  newTree.insert(103);
  newTree.insert(104);
  newTree.insert(991);
  newTree.checkTreeBalance();
  newTree.rebalanceTree();
  newTree.checkTreeBalance();
  newTree.getInorder();
  newTree.getPostorder();
  newTree.getPreorder();
}

testTree();
