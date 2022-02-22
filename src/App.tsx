import { Route, Routes, unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import EditeIcecream from './ice-cream/EditIcecream';
import Menu from './ice-cream/Menu';
import Footer from './structure/Footer';
import Header from './structure/Header';
import './styles/ice-cream.scss';
import { createBrowserHistory } from 'history';
import Icecreams from './ice-cream/Icecreams';
import AddIcecream from './ice-cream/AddIcecream';

const history = createBrowserHistory({ window });

const App = () => {
  return (
    <HistoryRouter history={history}>
      {/* to avoid navigation with keyboard to all menu itens */}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header />
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/menu-items/:menuItemId" element={<EditeIcecream history={history} />} />
        <Route path="/menu-items/add/:iceCreamId" element={<AddIcecream history={history} />} />
        <Route path="/ice-creams" element={<Icecreams />} />
        {/* <Route path="*" element={<Menu />} /> */}
      </Routes>
      <Footer />
    </HistoryRouter>
  );
};

export default App;
