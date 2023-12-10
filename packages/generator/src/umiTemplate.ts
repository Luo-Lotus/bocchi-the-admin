export const generateUmiTemplate = () => {
  const template = `
  import EProTable, { commonRequest } from '@/components/EProTable';
  import withKeepAlive from '@/components/withKeepAlive';
  import useQueryToForm from '@/hooks/useQueryToForm';
  import trpc, { RouterOutput } from '@/trpc';
  import { withAuth } from '@/utils/authUtil';
  import {
    ActionType,
    BetaSchemaForm,
    ProColumns,
    ProFormColumnsType,
  } from '@ant-design/pro-components';
  import AuthTree from '@bta/common/AuthTree';
  import { Button, FormInstance, Popconfirm, Space, message } from 'antd';
  import React, { useRef } from 'react';
  
  const {
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
  
  const AccountList: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();
    useQueryToForm(formRef);
  
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
          columns={getSchemas().filter((item) => item.dataIndex !== 'password')}
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
          columns={getSchemas()}
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
  
    const getSchemas = (): SchemaType<Account>[] => [
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
        hideInSearch: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createAt',
        valueType: 'dateTimeRange',
        hideInForm: true,
        hideInTable: true,
      },
      {
        title: '更新时间',
        dataIndex: 'updateAt',
        valueType: 'dateTime',
        hideInForm: true,
        hideInSearch: true,
      },
      {
        title: '更新时间',
        dataIndex: 'updateAt',
        valueType: 'dateTimeRange',
        hideInForm: true,
        hideInTable: true,
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
    ];
  
    return (
      <EProTable<Account>
        headerTitle="查询表格"
        actionRef={actionRef}
        formRef={formRef}
        rowKey="id"
        size="small"
        search={{
          span: 6,
          labelWidth: 50,
        }}
        toolBarRender={() => [renderCreateForm()]}
        request={commonRequest(queryAccounts.query)}
        columns={getSchemas()}
        rowSelection={{}}
      />
    );
  };
  
  export default withKeepAlive(AccountList);
  
  `;
};
