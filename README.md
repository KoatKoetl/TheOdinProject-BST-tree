# TheOdinProject-BST-tree
This is a project related to Binary Search Tree. <br>
Assignment: <br>
1. Build a Node class / factory. It should have an attribute for the data it stores as well as its left and right children.
2. Build a Tree class / factory which accepts an array when initialized. The Tree class should have a root attribute which uses the return value of buildTree which you’ll write next.
3. Write a buildTree function which takes an array of data (e.g. [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]) <br>
and turns it into a balanced binary tree full of Node objects appropriately placed (don’t forget to sort and remove duplicates!). The buildTree function should return the level-0 root node.
5. Write an insert and delete functions which accepts a value to insert/delete (you’ll have to deal with several cases for delete such as when a node has children or not).
6. Write a find function which accepts a value and returns the node with the given value.
7. Write a levelOrder function which accepts another function as a parameter. levelOrder should traverse the tree in breadth-first level order and provide each node as the argument to the provided function. <br>
This function can be implemented using either iteration or recursion.
8. Write inorder, preorder, and postorder functions that accept a function parameter. <br>
Each of these functions should traverse the tree in their respective depth-first order and yield each node to the provided function given as an argument. <br>
The functions should return an array of values if no function is given.
9. Write a height function which accepts a node and returns its height.
10. Write a depth function which accepts a node and returns its depth.
11. Write a isBalanced function which checks if the tree is balanced. A balanced tree is one where the difference between heights of left subtree and right subtree of every node is not more than 1.
12. Write a rebalance function which rebalances an unbalanced tree.

