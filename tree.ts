export class TreeNode {
  children: TreeNode[] = []
  constructor(
    public key: string,
    public value: { name: string },
    public parent: TreeNode | null = null
  ) {}
}

export class Tree {
  root: TreeNode
  nodes: TreeNode[]
  constructor(key: string, value: { name: string }) {
    this.root = new TreeNode(key, value)
    this.nodes = [this.root]
  }

  updateNodeName(key: string, name: string) {
    const node = this.nodes.find((n) => n.key === key)
    if (node) {
      node.value.name = name
    }
  }

  updateNodeChildren(key: string, children: TreeNode[]) {
    this.nodes = this.nodes.map((node) => {
      if (node.key === key) {
        const newChildren = children.map((child) => Object.assign({}, child, { parent: node }))
        const newNode = new TreeNode(node.key, node.value, node.parent)
        newNode.children = node.children.concat(newChildren)
        return newNode
      }

      return node
    })
  }

  *preOrderTraversal(node = this.root): any {
    yield node
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.preOrderTraversal(child)
      }
    }
  }

  *postOrderTraversal(node = this.root): any {
    if (node.children.length) {
      for (let child of node.children) {
        yield* this.postOrderTraversal(child)
      }
    }
    yield node
  }

  insert(parentNodeKey: string, key: string, value: { name: string }): TreeNode | undefined {
    for (let node of this.nodes) {
      if (node.key === parentNodeKey) {
        const child = new TreeNode(key, value, node)
        this.nodes.push(child)
        node.children.push(child)
        return child
      }
    }
    return undefined
  }

  removeByParent(parentNodeKey: string, key: string) {
    for (let node of this.nodes) {
      if (node.key !== parentNodeKey) {
        const filtered = node.children.filter((c) => c.key !== key)
        if (filtered.length !== node.children.length) {
          node.children = filtered
          return true
        }
      }
    }
    return false
  }

  remove(key: string, excludeName: string): void {
    const isSameKeyButDifferentName = (c: TreeNode) =>
      !(c.key === key && c.value.name !== excludeName)
    this.nodes = this.nodes.filter(isSameKeyButDifferentName).map((n) => {
      n.children = n.children.filter(isSameKeyButDifferentName)
      return n
    })
  }

  find(key: string): TreeNode | undefined {
    for (let node of this.nodes) {
      if (node.key === key) return node
    }
    return undefined
  }

  findByName(name: string): TreeNode | undefined {
    for (let node of this.nodes) {
      if (node.value.name === name) return node
    }
    return undefined
  }
}
