import avatar from '@/assets/images/ikuyo.png';
import logo from '@/assets/images/nijika.png';
import useTabs from '@/models/useTabs';
import useUser from '@/models/useUser';
import router from '@/router';
import { clearToken, withAuth } from '@/utils/authUtil';
import { LogoutOutlined } from '@ant-design/icons';
import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from '@ant-design/pro-components';
import { Link, Outlet, useLocation, useNavigate } from '@umijs/max';
import { AvatarProps, Dropdown, Spin, Tabs } from 'antd';
import { ReactNode } from 'react';
import { useAliveController, withAliveScope } from 'react-activation';
import './index.less';

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

  const renderTabs = () => (
    <Tabs
      className="pl-20px pt-10px"
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
  );

  const renderMenuItem = (menuDataItem: MenuDataItem, dom: ReactNode) => (
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
  );

  return (
    <ProLayout
      className="page-container"
      title={'Bocchi The Admin!'}
      route={router}
      location={{ pathname }}
      logo={logo}
      // 点击后跳转到对应页面
      menuItemRender={renderMenuItem}
      // 筛选权限
      postMenuData={(menusData) =>
        menusData?.filter((menu) => withAuth(menu, menu.authCode)) || []
      }
      layout="mix"
      avatarProps={{
        title: '后藤独',
        src: avatar,
        size: 'large',
        render: renderUserMenu,
      }}
    >
      {renderTabs()}

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
