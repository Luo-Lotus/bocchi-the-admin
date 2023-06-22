import { api } from '../../api';

const First = () => {
  const { data } = api.getTestInfo.useQuery('我发送数据拉');
  return <div> 接收到的数据：{data}</div>;
};

export default First;
