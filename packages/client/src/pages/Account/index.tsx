import EProTable from '@/components/EProTable';
import trpc, { RouterOutput } from '@/trpc';
import { withAuth } from '@/utils/authUtil';
import {
  ActionType,
  BetaSchemaForm,
  PageContainer,
  ProColumns,
  ProFormColumnsType,
} from '@ant-design/pro-components';
import AuthTree from '@bta/common/AuthTree';
import { Button, Popconfirm, Space, message } from 'antd';
import _ from 'lodash';
import React, { useMemo, useRef } from 'react';
import { ComponentProps } from '../../utils/typeUtils';

const {
  roleRouter: { queryRoles },
  accountRouter: {
    changePassword,
    queryAccounts,
    updateAccount,
    createAccount,
    deleteAccount,
  },
} = trpc;

type Account = RouterOutput['accountRouter']['queryAccounts']['data'][number];

type SchemaType<T> = ProColumns<T> & ProFormColumnsType<T>;

const TableList: React.FC<unknown> = () => {
  const actionRef = useRef<ActionType>();

  const renderChangePasswordForm = (record: Account) =>
    withAuth(
      <BetaSchemaForm<{
        password: string;
        confirmPassword: string;
      }>
        layoutType="ModalForm"
        initialValues={record}
        width={400}
        columns={[
          {
            title: '密码',
            dataIndex: 'password',
            valueType: 'password',
            formItemProps: {
              rules: [
                {
                  required: true,
                },
              ],
            },
          },
          {
            title: '确认密码',
            dataIndex: 'confirmPassword',
            valueType: 'password',
            formItemProps: (form) => ({
              required: true,
              rules: [
                {
                  required: true,
                },
                {
                  validator(rule, value, callback) {
                    const password = form.getFieldValue('password');
                    if (password !== value) {
                      return callback('两次输入密码不一致');
                    }
                    return callback();
                  },
                },
              ],
            }),
          },
        ]}
        trigger={
          <Button type="link" size="small">
            修改密码
          </Button>
        }
        onFinish={async (value) => {
          console.log(value);

          await changePassword.mutate({
            password: value.password,
            id: record.id,
            version: record.version,
          });
          actionRef.current?.reload();
          return true;
        }}
      />,
      AuthTree.accountModule.changePassword.code,
    );

  const renderEditForm = (record: Account) =>
    withAuth(
      <BetaSchemaForm<Account>
        layoutType="ModalForm"
        initialValues={record}
        width={400}
        columns={schemas.filter((item) => item.dataIndex !== 'password')}
        trigger={
          <Button type="link" size="small">
            编辑
          </Button>
        }
        onFinish={async (value) => {
          await updateAccount.mutate({
            ...value,
            id: record.id,
            version: record.version,
          });
          actionRef.current?.reload();
          return true;
        }}
      />,
      AuthTree.accountModule.update.code,
    );

  const renderCreateForm = () =>
    withAuth(
      <BetaSchemaForm<Account & { password: string }>
        layoutType="ModalForm"
        width={400}
        // @ts-ignore
        columns={schemas}
        trigger={<Button>新增</Button>}
        onFinish={async (value) => {
          await createAccount.mutate(value);
          actionRef.current?.reload();
          return true;
        }}
      />,
      AuthTree.accountModule.create.code,
    );

  const renderDeleteButton = (record: Account) =>
    withAuth(
      <Popconfirm
        title="确认删除？"
        onConfirm={async () => {
          await deleteAccount.mutate({
            id: record.id,
            version: record.version,
          });
          message.success('删除成功');
          actionRef.current?.reload();
          return true;
        }}
      >
        <Button type="link" danger size="small">
          删除
        </Button>
      </Popconfirm>,
      AuthTree.accountModule.delete.code,
    );

  const schemas: SchemaType<Account>[] = useMemo(
    () => [
      {
        title: 'id',
        dataIndex: 'id',
        hideInForm: true,
        valueType: 'id' as any,
      },
      {
        title: '账号',
        dataIndex: 'account',
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
        title: '密码',
        dataIndex: 'password',
        valueType: 'password',
        formItemProps: {
          rules: [
            {
              required: true,
            },
          ],
        },
        hideInTable: true,
        hideInSearch: true,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        valueType: 'text',
      },
      {
        title: '手机号',
        dataIndex: 'phoneNumber',
        valueType: 'text',
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        valueType: 'dateTime',
        hideInForm: true,
      },
      {
        title: '更新时间',
        dataIndex: 'updateAt',
        valueType: 'dateTime',
        hideInForm: true,
      },
      {
        title: '删除时间',
        dataIndex: 'deleteAt',
        valueType: 'dateTime',
        hideInForm: true,
      },
      {
        title: '操作',
        dataIndex: 'options',
        valueType: 'option',
        render: (_, record) => (
          <Space.Compact>
            {renderEditForm(record)}
            {renderDeleteButton(record)}
            {renderChangePasswordForm(record)}
          </Space.Compact>
        ),
        fixed: 'right',
      },
    ],
    [],
  );

  const request: ComponentProps<typeof EProTable<Account>>['request'] = async (
    params,
    sorter,
    filter,
  ) => {
    const result = await queryAccounts.query({
      page: {
        current: params.current!,
        pageSize: params.pageSize!,
      },
      filter: _.omit(params, ['pageSize', 'current']) as Account,
    });
    return {
      data: result.data,
      total: result.count,
      success: !!result,
    };
  };

  return (
    <PageContainer
      header={{
        title: '用户管理',
      }}
    >
      <EProTable<Account>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        size="small"
        search={{
          span: 6,
          labelWidth: 50,
        }}
        toolBarRender={() => [renderCreateForm()]}
        request={request}
        columns={schemas}
        rowSelection={{}}
        tableAlertRender={({ selectedRowKeys }) => (
          <div>
            已选择
            <a className="font-medium">{selectedRowKeys.length}</a>项
          </div>
        )}
      />
    </PageContainer>
  );
};

export default TableList;
