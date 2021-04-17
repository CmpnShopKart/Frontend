import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import RootPage from './components/RootPage/RootPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={RootPage}></Route>       
        </Switch>
      </div>
    </Router>
  );
}

export default App;
