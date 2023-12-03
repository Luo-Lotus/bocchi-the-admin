import EProTable, { commonRequest } from '@/components/EProTable';
import trpc, { RouterOutput } from '@/trpc';
import { withAuth } from '@/utils/authUtil';
import {
  ActionType,
  BetaSchemaForm,
  ProColumns,
  ProFormColumnsType,
} from '@ant-design/pro-components';
import AuthTree from '@bta/common/AuthTree';
import {
  Button,
  Popconfirm,
  SelectProps,
  Space,
  SwitchProps,
  message,
} from 'antd';
import React, { useRef } from 'react';
import withKeepAlive from '../../components/withKeepAlive';

const {
  roleRouter: { queryRoles },
  accountRouter: { queryAccounts },
  userRouter: { queryUsers, updateUser, createUser, deleteUser },
} = trpc;

type User = RouterOutput['userRouter']['queryUsers']['data'][number];

type SchemaType<T> = ProColumns<T> & ProFormColumnsType<T>;

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();

  const schemas: SchemaType<User>[] = [
    {
      title: 'id',
      sorter: true,
      dataIndex: 'id',
      hideInForm: true,
      valueType: 'id' as any,
    },
    {
      title: '用户名',
      dataIndex: 'username',
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
      title: '头像Url',
      dataIndex: 'avatar',
      valueType: 'text',
    },
    {
      title: '是否禁用',
      sorter: true,
      dataIndex: 'isBanned',
      valueType: 'switch',
      fieldProps: {
        checkedChildren: '是',
        unCheckedChildren: '否',
      } as SwitchProps,
    },
    {
      title: '角色',
      dataIndex: 'roleId',
      valueType: 'select',
      request: async (params) =>
        (
          await queryRoles.query({
            filter: {
              roleName: params.keyword || '',
            },
            page: {
              current: 1,
              pageSize: 100,
            },
          })
        ).data.map((item) => ({
          label: item.roleName,
          value: item.id,
        })),
      fieldProps: {
        showSearch: true,
        placeholder: '搜索角色',
      } as SelectProps,
    },
    {
      title: '账户',
      dataIndex: 'accountId',
      valueType: 'select',
      request: async (params) =>
        (
          await queryAccounts.query({
            filter: {
              account: params.keyword || '',
            },
            page: {
              current: 1,
              pageSize: 100,
            },
          })
        ).data.map((item) => ({
          label: item.account,
          value: item.id,
        })),
      fieldProps: {
        showSearch: true,
        placeholder: '搜索账户',
      } as SelectProps,
    },
    {
      title: '创建时间',
      sorter: true,
      dataIndex: 'createAt',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '更新时间',
      sorter: true,
      dataIndex: 'updateAt',
      valueType: 'dateTime',
      hideInForm: true,
    },
    {
      title: '操作',
      dataIndex: 'options',
      valueType: 'option',
      width: 100,
      render: (_, record) => (
        <Space>
          {withAuth(
            <BetaSchemaForm<User>
              layoutType="ModalForm"
              initialValues={record}
              width={400}
              columns={schemas}
              trigger={
                <Button type="primary" size="small">
                  编辑
                </Button>
              }
              onFinish={async (value) => {
                await updateUser.mutate({
                  ...value,
                  id: record.id,
                  version: record.version,
                });
                actionRef.current?.reload();
                return true;
              }}
            />,
            AuthTree.userModule.update.code,
          )}
          {withAuth(
            <Popconfirm
              title="确认删除？"
              onConfirm={async () => {
                await deleteUser.mutate({
                  id: record.id,
                  version: record.version,
                });
                message.success('删除成功');
                actionRef.current?.reload();
              }}
            >
              <Button danger size="small">
                删除
              </Button>
            </Popconfirm>,
            AuthTree.userModule.delete.code,
          )}
        </Space>
      ),
      fixed: 'right',
    },
  ];

  return (
    <EProTable<User>
      headerTitle="查询表格"
      actionRef={actionRef}
      rowKey="id"
      size="small"
      search={{
        span: 6,
        labelWidth: 50,
      }}
      toolBarRender={() => [
        withAuth(
          <BetaSchemaForm<User>
            layoutType="ModalForm"
            width={400}
            columns={schemas}
            trigger={<Button>新增</Button>}
            onFinish={async (value) => {
              await createUser.mutate(value);
              actionRef.current?.reload();
              return true;
            }}
          />,
          AuthTree.userModule.create.code,
        ),
      ]}
      request={commonRequest(queryUsers.query)}
      columns={schemas}
      rowSelection={{}}
      tableAlertRender={({ selectedRowKeys }) => (
        <div>
          已选择
          <a className="font-medium">{selectedRowKeys.length}</a>项
        </div>
      )}
    />
  );
};

export default withKeepAlive(TableList);
