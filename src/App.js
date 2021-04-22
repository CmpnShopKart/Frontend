import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import RootPage from './components/RootPage/RootPage';
import BuyerHomePage from './components/HomePage/BuyerHomePage';
import history from './history';

function App() {
  return (
    <Router history={history}>
      <div className="App">
        <Switch>
          <Route path='/' exact component={RootPage}></Route>       
          <Route path='/buyer/home' exact component={BuyerHomePage}></Route>       
        </Switch>
      </div>
    </Router>
  );
}

export default App;
