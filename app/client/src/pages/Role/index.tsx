import trpc, { RouterOutput } from '@/trpc';
import {
  ActionType,
  BetaSchemaForm,
  PageContainer,
  ProColumns,
  ProFormColumnsType,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import _ from 'lodash';
import React, { useRef } from 'react';

const { queryRoles, updateRole, createRole, deleteRole } = trpc.roleRouter;

type Role = RouterOutput['roleRouter']['queryRoles']['data']['0'];

type SchemaType<T> = ProColumns<T> & ProFormColumnsType<T>;

const schemas: SchemaType<Role>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    hideInForm: true,
    valueType: 'digit',
  },
  {
    title: '角色名',
    dataIndex: 'roleName',
    formItemProps: {
      initialValue: '',
      rules: [
        {
          required: true,
          message: '名称为必填项',
        },
      ],
    },
    fixed: 'left',
  },
  {
    title: '权限',
    dataIndex: 'permissions',
    valueType: 'treeSelect',
    initialValue: [],
  },
  {
    title: '操作',
    dataIndex: 'options',
    valueType: 'option',
    render: (_, record) => (
      <Space.Compact>
        <BetaSchemaForm<Role>
          layoutType="ModalForm"
          width={400}
          columns={schemas}
          trigger={<Button type="link">编辑</Button>}
        />
        <Popconfirm title="确认删除？">
          <Button danger type="link">
            删除
          </Button>
        </Popconfirm>
      </Space.Compact>
    ),
    fixed: 'right',
  },
];

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();
  return (
    <PageContainer
      header={{
        title: '权限管理',
      }}
    >
      <ProTable<Role>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        size="small"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <BetaSchemaForm<Role>
            layoutType="ModalForm"
            width={400}
            columns={schemas}
            trigger={<Button>新增</Button>}
          />,
        ]}
        request={async (params, sorter, filter) => {
          console.log(params, sorter, filter);
          const result = await queryRoles.query({
            page: {
              current: params.current!,
              pageSize: params.pageSize!,
            },
            filter: _.omit(params, ['pageSize', 'current']) as Role,
          });
          return {
            data: result.data,
            total: result.count,
            success: !!result,
          };
        }}
        columns={schemas}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择 <a style={{ fontWeight: 600 }}>{selectedRowKeys.length}</a>项
          </div>
        )}
      />
    </PageContainer>
  );
};

export default TableList;
