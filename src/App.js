import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import RootPage from './components/RootPage/RootPage';
import BuyerHomePage from './components/HomePage/BuyerHomePage';
import SellerHomePage from './components/HomePage/SellerHomePage';
import BuyerCartPage from './components/BuyerCartPage/BuyerCartPage';
import BuyerOrdersPage from './components/BuyerOrdersPage/BuyerOrdersPage';
import history from './history';



function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path='/' exact component={RootPage}></Route>       
          <Route path='/buyer/home' exact component={BuyerHomePage}></Route>       
          <Route path='/buyer/cart' exact component={BuyerCartPage}></Route>       
          <Route path='/buyer/orders' exact component={BuyerOrdersPage}></Route>       
          <Route path='/seller/home' exact component={SellerHomePage}></Route>       
        </Switch>
      </div>
    </Router>
  );
}

export default App;




