import { TreeNode, Tree } from "./tree.ts"
import { seedValue } from "./tree-seed.ts"

export class Zoomer {
  public position: string
  public unvisited: TreeNode[]

  constructor(public tree: Tree, public path: string[]) {
    this.unvisited = [...tree.preOrderTraversal()].slice(1)
    this.position = this.tree.root.key
  }

  in(name: string): TreeNode | undefined {
    const node = this.tree.findByName(name)
    if (node) {
      this.tree.remove(node.key, node.value.name)
      this.unvisited = this.unvisited.filter((n) => n.key !== node.key)

      if (node.children.length === 0) {
        this.shiftNodesTo(node)
      }

      this.position = node.key
      this.path.push(node.value.name)
    }
    return node
  }

  shiftNodesTo(node: TreeNode, count = 2) {
    const visitedPortals = new Set(this.path)
    let candidates: TreeNode[] = []
    for (let i = 0; i < count; i++) {
      const val = this.unvisited[i]
      if (!val) {
        break
      }
      const seenPortal = val.parent && visitedPortals.has(val.parent.value.name)
      let candidate: TreeNode

      if (seenPortal) {
        candidate = new TreeNode(val.key, seedValue(), node)
      } else {
        candidate = new TreeNode(val.key, { ...val.value }, node)
        const newValue = seedValue()
        this.tree.updateNodeName(val.key, newValue.name)
        val.value = newValue
      }

      candidates.push(candidate)
    }

    this.tree.nodes.push(...candidates)
    this.tree.updateNodeChildren(node.key, candidates)
  }

  out(): TreeNode | undefined {
    const visitedPortals = new Set(this.path)
    const curr = this.tree.nodes.find((node) =>
      node.children.some(
        (child) => child.key === this.position && visitedPortals.has(child.value.name)
      )
    )
    if (curr) {
      this.position = curr.key
      this.path.push(curr.value.name)
    }
    return curr
  }

  // syncUnvisited() {
  //   this.unvisited = this.tree.nodes.filter(
  //     node => !this.path.includes(node.value.name)
  //   );
  // }
}
