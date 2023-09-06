import router from '@/router';
import { ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useLocation } from '@umijs/max';

export default function Page() {
  const { pathname } = useLocation();
  return (
    <ProLayout
      title={'Lotus Admin'}
      route={router}
      location={{ pathname }}
      onClick={(e) => {
        console.log(e);
      }}
      menuItemRender={(menuDataItem, dom) => (
        <Link to={menuDataItem.path as string}>{dom}</Link>
      )}
    >
      <Outlet />
    </ProLayout>
  );
}
