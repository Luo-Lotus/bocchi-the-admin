import trpc from '@/trpc';
import { PageContainer } from '@ant-design/pro-components';
import { useAccess } from '@umijs/max';
import { Button } from 'antd';

const AccessPage: React.FC = () => {
  const access = useAccess();
  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Button
        onClick={() => {
          trpc.testRouter.authTest.query();
        }}
      >
        点击向没有权限的接口发送请求
      </Button>
    </PageContainer>
  );
};

export default AccessPage;
