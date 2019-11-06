declare namespace AC {
  // 可增删改树节点类型
  export interface TreeNodeCfgaType {
    id: number;
    label: string,
    isEdit: boolean;
    children: TreeNodeCfgaType[];
  }
}