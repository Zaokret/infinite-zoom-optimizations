import { Tree, TreeNode } from "./tree";

let first = 65
let currentCharCode = 65;
export function seedValue() {
    const val = String.fromCharCode(first) + String.fromCharCode(currentCharCode)
    currentCharCode++
    if(currentCharCode > 'Z'.charCodeAt(0)) {
      first++
      currentCharCode = 65
    }
    return {name: val};
}

export function seedTree(spread: number = 2, depth: number = 4) {


  const tree = new Tree('1', seedValue());
  const rootNode = tree.root;

  function seed(node: TreeNode, spr: number, count: number) {
    if(!node) {
      return
    }
    if(count === 0) {
      return
    }
    else {
      for (let i = 0; i < spr; i++) {
        const child = tree.insert(node.key, [node.key, '.', node.children.length + 1].join(""), seedValue());
        if(child) {
          seed(child, spr, count - 1)
        }
      }
    }
  }

  for (let j = 0; j < spread; j++) {
    const child = tree.insert(rootNode.key, [rootNode.key, '.', rootNode.children.length + 1].join(''), seedValue());
    if(child) {
      seed(child, spread, depth-1)
    }
  }
  return tree;
}