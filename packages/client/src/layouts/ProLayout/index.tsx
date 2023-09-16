import logo from '@/assets/images/nijika.png';
import useUser from '@/models/useUser';
import router from '@/router';
import { withAuth } from '@/utils/authUtil';
import { ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useLocation } from '@umijs/max';
import { Spin } from 'antd';

export default function Page() {
  const { pathname } = useLocation();
  const user = useUser();
  if (!user) {
    return <Spin />;
  }
  return (
    <ProLayout
      title={'Bocchi The Admin!'}
      route={router}
      location={{ pathname }}
      logo={logo}
      // 点击后跳转到对应页面
      menuItemRender={(menuDataItem, dom) => (
        <Link to={menuDataItem.path as string}>{dom}</Link>
      )}
      // 筛选权限
      postMenuData={(menusData) => {
        return menusData?.filter((menu) => withAuth(menu, menu.authCode)) || [];
      }}
    >
      <Outlet />
    </ProLayout>
  );
}
