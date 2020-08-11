import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from './pages/Home';
import About from './pages/About';
import Basket from './pages/Basket';
import ProductShow from './pages/ProductShow';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <main>
      <Router>
        <Header />
        <Switch>
          <Route path={process.env.PUBLIC_URL + '/products/basket'} component={Basket}/>
          <Route path={process.env.PUBLIC_URL + '/product'} component={ProductShow}/>
          <Route path={`${process.env.PUBLIC_URL}/about`} component={About}/>
          <Route path={process.env.PUBLIC_URL + '/'} component={Home}/>
          {/* <Route path="/"><Redirect to="/alexandra-rose-gifts" /></Route> */}
        </Switch>      
      </Router>
      <Footer />
    </main>
  );
}

export default App;
