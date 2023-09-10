import { RouterOutput } from '@/trpc';
import {
  BetaSchemaForm,
  ProColumns,
  ProFormColumnsType,
} from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';

export type Role = RouterOutput['roleRouter']['queryRoles']['data']['0'];

export type SchemaType<T> = ProColumns<T> & ProFormColumnsType<T>;

export const schemas: SchemaType<Role>[] = [
  {
    title: 'id',
    dataIndex: 'id',
    hideInForm: true,
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
