import trpc, { RouterOutput } from '@/trpc';
import { PageContainer } from '@ant-design/pro-components';
import { ReactNode, useEffect, useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Button, Space, Tree } from 'antd';
import _ from 'lodash';
import styles from './index.less';

type AuthTree = RouterOutput['PermissionRouter']['getAuthTree'];

type TreeNode = {
  title?: ReactNode;
  key?: number;
  field?: string;
  children?: TreeNode[];
} & AuthTree;

export default function Auth() {
  const [treeNode, setTreeNode] = useState<TreeNode>();

  useEffect(() => {
    trpc.PermissionRouter.getAuthTree.query().then((res) => {
      setTreeNode(toTreeNode(res));
    });
  }, []);

  // const authList = useMemo(
  //   () => treeNode && getFlattedAuthList(treeNode),
  //   [treeNode],
  // );

  const toTreeNode = (node: TreeNode, fieldName?: string) => {
    const newNode = { ...node };
    const otherNode = _.omit(node, 'name', 'code');
    newNode.key = node.code;
    fieldName && (newNode.field = fieldName);
    newNode.title = renderTreeNodeTitle(newNode);
    if (!_.isEmpty(otherNode)) {
      newNode.children = [];
      for (const child in otherNode) {
        // @ts-ignore
        newNode.children.push(toTreeNode(otherNode[child] as TreeNode, child));
      }
    }

    return newNode;
  };

  // WIP: 处理节点增删改查
  const renderTreeNodeTitle = (node: TreeNode) => (
    <Space>
      <div className={styles.title}>
        {node.field} - {node.name}
      </div>
      <Button size="small">删除</Button>
      <Button size="small">添加子项</Button>
    </Space>
  );
  console.log(treeNode);

  return (
    <PageContainer>
      {treeNode && (
        <Tree
          selectable={false}
          treeData={[treeNode]}
          switcherIcon={
            <DownOutlined
              style={{
                marginTop: '12px',
                fontSize: '16px',
              }}
            />
          }
          showLine={true}
        />
      )}
    </PageContainer>
  );
}
