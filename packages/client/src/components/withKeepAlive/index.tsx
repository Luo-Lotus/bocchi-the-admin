import { KeepAlive, useLocation, useRouteData } from '@umijs/max';
import { FC, useEffect } from 'react';
import useTabs from '../../models/useTabs';

const withKeepAlive = (Component: FC) => {
  return () => {
    const routeData = useRouteData();
    const { pathname } = useLocation();
    const { pushTab, setActiveKey } = useTabs();

    // 页面初次加载时渲染tab标签
    useEffect(() => {
      pushTab({
        path: pathname!,
        key: pathname!,
        // @ts-ignore
        label: routeData.route.name,
      });
      setActiveKey(pathname!);
    }, []);

    return (
      <KeepAlive name={pathname}>
        <Component />
      </KeepAlive>
    );
  };
};

export default withKeepAlive;
