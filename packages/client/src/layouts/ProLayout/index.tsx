import avatar from '@/assets/images/ikuyo.png';
import logo from '@/assets/images/nijika.png';
import useTabs from '@/models/useTabs';
import useUser from '@/models/useUser';
import router from '@/router';
import { clearToken, withAuth } from '@/utils/authUtil';
import { LogoutOutlined } from '@ant-design/icons';
import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, Outlet, useLocation, useNavigate } from '@umijs/max';
import { AvatarProps, Dropdown, Spin, Tabs } from 'antd';
import { ReactNode } from 'react';
import { useAliveController, withAliveScope } from 'react-activation';

const Page = () => {
  const { pathname } = useLocation();
  const { tabItems, pushTab, closeTab, activeKey, setActiveKey } = useTabs();
  const navigate = useNavigate();
  const user = useUser();
  const { drop } = useAliveController();

  if (!user) {
    return <Spin />;
  }

  const renderUserMenu = (props: AvatarProps, dom: ReactNode) => (
    <Dropdown
      menu={{
        items: [
          {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: '退出登录',
            onClick: () => {
              clearToken();
              navigate('/login');
            },
          },
        ],
      }}
    >
      {dom}
    </Dropdown>
  );

  return (
    <ProLayout
      title={'Bocchi The Admin!'}
      route={router}
      location={{ pathname }}
      logo={logo}
      // 点击后跳转到对应页面
      menuItemRender={(menuDataItem, dom) => (
        <Link
          to={menuDataItem.path as string}
          onClick={() => {
            pushTab({
              path: menuDataItem.path!,
              key: menuDataItem.key!,
              label: menuDataItem.name!,
            });
            setActiveKey(menuDataItem.key!);
          }}
        >
          {dom}
        </Link>
      )}
      // 筛选权限
      postMenuData={(menusData) => {
        const menus =
          menusData?.filter((menu) => withAuth(menu, menu.authCode)) || [];

        return menus;
      }}
      layout="mix"
      avatarProps={{
        title: '后藤独',
        src: avatar,
        size: 'large',
        render: renderUserMenu,
      }}
    >
      <Tabs
        className="pl-40px pt-20px"
        size="small"
        type="editable-card"
        hideAdd
        items={tabItems}
        activeKey={activeKey}
        onEdit={(targetKey, action) => {
          if (action === 'remove') {
            closeTab(targetKey as string);
            // 清除keepAlive缓存
            drop(targetKey as string);
          }
        }}
        onChange={(key) => {
          const item = tabItems.find((item) => item.key === key);
          if (item) {
            navigate(item.path);
            setActiveKey(item.key);
          }
        }}
      />
      <PageContainer
        header={{
          title: null,
        }}
      >
        <Outlet />
      </PageContainer>
    </ProLayout>
  );
};

export default withAliveScope(Page);
