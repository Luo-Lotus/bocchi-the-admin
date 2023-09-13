import { RouterOutput } from '@/trpc';
import { ReactNode } from 'react';

import AuthTree from '@monorepo/common/AuthTree';
import { TreeSelect, TreeSelectProps } from 'antd';
import { default as _, default as lodash } from 'lodash';

type AuthTree = RouterOutput['permissionRouter']['getAuthTree'];

type TreeNode = {
  title?: ReactNode;
  key?: number;
  value?: number;
  field?: string;
  selectable?: boolean;
  children?: TreeNode[];
  parent?: TreeNode;
} & AuthTree;

const authNameMap: Record<number, TreeNode> = {};

const toAntdTreeNode = (node: TreeNode, fieldName?: string) => {
  const newNode = { ...node };
  const otherNode = _.omit(node, 'name', 'code');
  newNode.key = node.code;
  newNode.value = node.code;
  fieldName && (newNode.field = fieldName);
  newNode.title = node.name;
  if (!_.isEmpty(otherNode)) {
    newNode.children = [];
    for (const child in otherNode) {
      // @ts-ignore
      const childNode = toAntdTreeNode(otherNode[child] as TreeNode, child);
      childNode.parent = newNode;
      newNode.children.push(childNode);
    }
  }
  authNameMap[newNode.value] = newNode;
  return newNode;
};

const treeNode = toAntdTreeNode(AuthTree);

export default function AuthTreeSelect(props: TreeSelectProps) {
  const getChildrenCodes = (node: TreeNode, acc: number[]) => {
    if (node.children?.length) {
      node.children.forEach((item) => {
        acc.push(item.code);
        getChildrenCodes(item, acc);
      });
    }
    return acc;
  };

  return (
    treeNode && (
      <TreeSelect
        className="w-50"
        treeDefaultExpandAll
        {...props}
        value={
          props.value?.map((item: number) => ({
            value: item,
            label: authNameMap[item].name,
          })) || []
        }
        onChange={(value, ...rest) => {
          const [_, { triggerValue, checked }] = rest;
          let newValue: number[] =
            value?.map((item: any) =>
              lodash.isNil(item.value) ? item : item.value,
            ) || [];
          // 获取当前选择的node
          const currentNode = authNameMap[triggerValue as number];
          // 获取所有子node的code
          const childrenCodes = getChildrenCodes(currentNode, []);
          // 如果当前为选中则自动选择父元素
          if (currentNode.parent && checked) {
            currentNode.parent.value && newValue.push(currentNode.parent.value);
          }
          // 如果当前为选中自动选择子元素，为未选择自动反选子元素
          if (currentNode.children?.length && checked) {
            newValue.push(...childrenCodes);
          } else if (currentNode.children?.length && !checked) {
            newValue = newValue.filter((item) => !childrenCodes.includes(item));
          }
          props?.onChange?.(
            lodash.uniq(newValue.filter((item) => !lodash.isNil(item))),
            ...rest,
          );
        }}
        maxTagCount={4}
        treeCheckStrictly={!_.isEmpty(props.value)}
        treeData={[treeNode as any]}
      />
    )
  );
}
