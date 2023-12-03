import withKeepAlive from '../../components/withKeepAlive';
import styles from './index.less';

const HomePage: React.FC = () => {
  return <div className={styles.container}>Welcome To Bocchi The Admin!</div>;
};

export default withKeepAlive(HomePage);
