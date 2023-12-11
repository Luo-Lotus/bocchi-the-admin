import { DMMF } from '@prisma/generator-helper';
import { getRelationModelFields } from './utils';

export const generateUmiTemplate = (model: DMMF.Model) => {
  const fields = model.fields;
  const modelFields = getRelationModelFields(fields);
  const name = model.name;
  const modelLowerCaseName = name.toLowerCase();
  const modelUpperCaseName = name.toUpperCase();
  const template = `import EProTable, { SchemaType, commonRequest } from '@/components/EProTable';
  import trpc, { RouterOutput } from '@/trpc';
  import { withAuth } from '@/utils/authUtil';
  import { ActionType, BetaSchemaForm } from '@ant-design/pro-components';
  import AuthTree from '@bta/common/AuthTree';
  import { Link } from '@umijs/max';
  import {
    Button,
    FormInstance,
    Popconfirm,
    SelectProps,
    Space,
    SwitchProps,
    message,
  } from 'antd';
  import React, { useRef } from 'react';
  import withKeepAlive from '@/components/withKeepAlive';
  import useQueryToForm from '@/hooks/useQueryToForm';
  
  const {
    ${modelFields
      .map(
        (field) =>
          `${field.name.toLocaleLowerCase() as string}Router: { query${
            field.name
          } }`,
      )
      .join(', ')},
    ${modelLowerCaseName}Router: { query${name}s, update${name}, create${name}, delete${name} },
  } = trpc;
  
  type ${name} = RouterOutput['${name}Router']['query${name}s']['data'][number];
  
  const ${name}List: React.FC = () => {
    const actionRef = useRef<ActionType>();
    const formRef = useRef<FormInstance>();
    useQueryToForm(formRef);
  
    const getSchema = (): SchemaType<${name}>[] => [
      {
        title: 'id',
        sorter: true,
        dataIndex: 'id',
        hideInForm: true,
        valueType: 'id' as any,
      },
      {
        title: '用户名',
        dataIndex: '',
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
        request: queryRolesRequest,
        render(text, record, index, action) {
          return <Link to={\`/role ? id = \${ record.roleId }\`}>{text}</Link>;
        },
        fieldProps: {
          showSearch: true,
          placeholder: '搜索角色',
        } as SelectProps,
      },
      {
        title: '账户',
        dataIndex: 'accountId',
        valueType: 'select',
        request: queryAccountsRequest,
        render(text, record, index, action) {
          return <Link to={\`/account?id=\${record.roleId}\`}>{text}</Link>;
        },
        fieldProps: {
          showSearch: true,
          placeholder: '搜索账户',
        } as SelectProps,
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
          <Space>
            {renderEditForm(record)}
            {renderDeleteForm(record)}
          </Space>
        ),
        fixed: 'right',
      },
    ];
  
    const queryRolesRequest = async (params: any) =>
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
      }));
  
    const queryAccountsRequest = async (params: any) =>
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
      }));
  
    const renderCreateForm = () =>
      withAuth(
        <BetaSchemaForm<${name}>
          layoutType="ModalForm"
          width={400}
          columns={getSchema()}
          trigger={<Button>新增</Button>}
          onFinish={async (value) => {
            await createUser.mutate(value);
            actionRef.current?.reload();
            return true;
          }}
        />,
        AuthTree.${modelLowerCaseName}Module.create.code,
      );
  
    const renderEditForm = (record: ${name}) =>
      withAuth(
        <BetaSchemaForm<${name}>
          layoutType="ModalForm"
          initialValues={record}
          width={400}
          columns={getSchema()}
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
        AuthTree.${modelLowerCaseName}Module.update.code,
      );
  
    const renderDeleteForm = (record: ${name}) =>
      withAuth(
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
        AuthTree.${modelLowerCaseName}Module.delete.code,
      );
  
    return (
      <EProTable<${name}>
        formRef={formRef}
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
        size="small"
        search={{
          span: 6,
          labelWidth: 50,
        }}
        toolBarRender={() => [renderCreateForm()]}
        request={commonRequest(queryUsers.query)}
        columns={getSchema()}
        rowSelection={{}}
      />
    );
  };
  
  export default withKeepAlive(UserList);
  
  `;
};
