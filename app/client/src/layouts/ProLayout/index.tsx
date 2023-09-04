import { ProLayout } from '@ant-design/pro-components';
import { Outlet } from '@umijs/max';

export default function Page() {
  console.log(11);

  return (
    <ProLayout title={'LotusAdmin'}>
      <Outlet />
    </ProLayout>
  );
}
