import ApiProvider from './api/Provider';
import First from './pages/First';

const App = () => {
  return (
    <ApiProvider>
      <First></First>
    </ApiProvider>
  );
};

export default App;
