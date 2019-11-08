// 树相关

// ################################################# 树： 节点可增删改移 ##################################################
export const TREE_DATA = [
  {
    id: 1,
    label: '一级 1',
    isEdit: false,
    children: [
      {
        id: 4,
        label: '二级 1-1',
        isEdit: false,
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
            isEdit: false,
          },
          {
            id: 10,
            label: '三级 1-1-2',
            isEdit: false,
          },
          {
            id: 11,
            label: '三级 1-1-3',
            isEdit: false,
          },
        ],
      },
      {
        id: 12,
        label: '二级 1-2',
        isEdit: false,
        children: [],
      },
      {
        id: 13,
        label: '二级 1-3',
        isEdit: false,
        children: [],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    isEdit: false,
    children: [
      {
        id: 5,
        label: '二级 2-1',
        isEdit: false,
      },
      {
        id: 6,
        label: '二级 2-2',
        isEdit: false,
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    isEdit: false,
    children: [
      {
        id: 7,
        label: '二级 3-1',
        isEdit: false,
      },
      {
        id: 8,
        label: '二级 3-2',
        isEdit: false,
      },
    ],
  },
];

