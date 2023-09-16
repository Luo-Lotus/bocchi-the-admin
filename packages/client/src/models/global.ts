// 全局共享数据示例

import useUser from './useUser';

const useGlobal = () => {
  const userStore = useUser();
  return {
    userStore,
  };
};

export default useGlobal;
