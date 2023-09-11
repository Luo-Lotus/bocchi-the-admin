import AuthTreeSelect from '@/components/AuthSelectTree';
import trpc, { RouterOutput } from '@/trpc';
import {
  ActionType,
  BetaSchemaForm,
  PageContainer,
  ProColumns,
  ProFormColumnsType,
  ProTable,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space, TreeSelect } from 'antd';
import _ from 'lodash';
import React, { useRef } from 'react';

const { queryRoles, updateRole, createRole, deleteRole } = trpc.roleRouter;

type Role = RouterOutput['roleRouter']['queryRoles']['data']['0'];

type SchemaType<T> = ProColumns<T> & ProFormColumnsType<T>;

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();

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
      valueType: 'text',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      fixed: 'left',
    },
    {
      title: '权限',
      dataIndex: 'permissions',
      formItemProps: {
        rules: [
          {
            required: true,
          },
        ],
      },
      render: (_, record) => {
        return (
          <AuthTreeSelect
            value={record.permissions || []}
            multiple
            treeCheckable
            showCheckedStrategy={'SHOW_PARENT'}
          />
        );
      },
      renderFormItem: () => {
        return (
          <AuthTreeSelect
            multiple
            treeCheckable
            labelInValue
            showCheckedStrategy={TreeSelect.SHOW_ALL}
          />
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'options',
      valueType: 'option',
      render: (_, record) => (
        <Space.Compact>
          <BetaSchemaForm<Role>
            layoutType="ModalForm"
            initialValues={record}
            width={400}
            columns={schemas}
            trigger={<Button type="link">编辑</Button>}
            onFinish={async (value) => {
              await updateRole.mutate({
                ...value,
                id: record.id,
              });
              actionRef.current?.reload();
              return true;
            }}
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
            onFinish={async (value) => {
              await createRole.mutate(value);
              actionRef.current?.reload();
              return true;
            }}
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
