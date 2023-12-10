import AuthTreeSelect from '@/components/AuthSelectTree';
import { SchemaType, commonRequest } from '@/components/EProTable';
import withKeepAlive from '@/components/withKeepAlive';
import useQueryToForm from '@/hooks/useQueryToForm';
import trpc, { RouterOutput } from '@/trpc';
import { withAuth } from '@/utils/authUtil';
import {
  ActionType,
  BetaSchemaForm,
  ProTable,
} from '@ant-design/pro-components';
import AuthTree from '@bta/common/AuthTree';
import {
  Button,
  FormInstance,
  Popconfirm,
  Space,
  TreeSelect,
  message,
} from 'antd';
import React, { useRef } from 'react';

const { queryRoles, updateRole, createRole, deleteRole } = trpc.roleRouter;

type Role = RouterOutput['roleRouter']['queryRoles']['data'][number];

const RoleList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const formRef = useRef<FormInstance>();
  useQueryToForm(formRef);

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
        <Space>
          {withAuth(
            <BetaSchemaForm<Role>
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
                await updateRole.mutate({
                  ...value,
                  id: record.id,
                  version: record.version,
                });
                actionRef.current?.reload();
                return true;
              }}
            />,
            AuthTree.roleModule.update.code,
          )}
          {withAuth(
            <Popconfirm
              title="确认删除？"
              onConfirm={async () => {
                await deleteRole.mutate(record.id);
                message.success('删除成功');
                actionRef.current?.reload();
              }}
            >
              <Button danger size="small">
                删除
              </Button>
            </Popconfirm>,
            AuthTree.roleModule.delete.code,
          )}
        </Space>
      ),
      fixed: 'right',
    },
  ];

  const renderCreateForm = () =>
    withAuth(
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
      AuthTree.roleModule.create.code,
    );

  return (
    <ProTable<Role>
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
      request={commonRequest(queryRoles.query)}
      columns={schemas}
      rowSelection={{}}
    />
  );
};

export default withKeepAlive(RoleList);
