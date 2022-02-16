import {
  BrowserRouter,
  Route,
  Routes,
  unstable_HistoryRouter as HistoryRouter,
} from 'react-router-dom';
import EditeIcecream from './ice-cream/EditIcecream';
import Menu from './ice-cream/Menu';
import Footer from './structure/Footer';
import Header from './structure/Header';
import './styles/ice-cream.scss';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory({ window });

const App = () => {
  return (
    <HistoryRouter history={history}>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu-items/:menuItemId" element={<EditeIcecream history={history} />} />
        {/* <Route path="*" element={<Menu />} /> */}
      </Routes>
      <Footer />
    </HistoryRouter>
  );
};

export default App;
