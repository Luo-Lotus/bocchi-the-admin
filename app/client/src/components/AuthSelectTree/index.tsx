import trpc, { RouterOutput } from '@/trpc';
import { ReactNode, useEffect, useRef, useState } from 'react';

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

export default function AuthTreeSelect(props: TreeSelectProps) {
  const [treeNode, setTreeNode] = useState<TreeNode>();
  useEffect(() => {
    trpc.permissionRouter.getAuthTree.query().then((res) => {
      setTreeNode(toTreeNode(res));
    });
  }, []);

  const authNameMap = useRef<Record<number, TreeNode>>({});

  const toTreeNode = (node: TreeNode, fieldName?: string) => {
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
        const childNode = toTreeNode(otherNode[child] as TreeNode, child);
        childNode.parent = newNode;
        newNode.children.push(childNode);
      }
    }
    authNameMap.current[newNode.value] = newNode;
    return newNode;
  };
  console.log(props.value);

  return (
    treeNode && (
      <TreeSelect
        className="w-50"
        {...props}
        value={
          props.value?.map((item: number) => ({
            value: item,
            label: authNameMap.current[item].name,
          })) || []
        }
        onChange={(value, ...rest) => {
          const [_, { triggerValue, checked }] = rest;
          const newValue = value?.map((item: any) => item.value) || [];
          const currentNode = authNameMap.current[triggerValue as number];
          if (currentNode.parent && checked) {
            newValue.push(currentNode.parent.value);
          } else if (!currentNode.children?.length && checked) {
            newValue.push(currentNode.children?.map((node) => node.value));
          }
          props?.onChange?.(lodash.uniq(newValue), ...rest);
        }}
        onSelect={(...rest) => {
          console.log(rest);
        }}
        maxTagCount={4}
        treeCheckStrictly={!_.isEmpty(props.value)}
        treeData={[treeNode as any]}
      />
    )
  );
}
