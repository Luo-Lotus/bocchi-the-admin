import BTRImage from '../../components/BTRImage';
import withKeepAlive from '../../components/withKeepAlive';
import styles from './index.less';

const HomePage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title}>Welcome To Bocchi The Admin! </div>
      <BTRImage />
    </div>
  );
};

export default withKeepAlive(HomePage);
