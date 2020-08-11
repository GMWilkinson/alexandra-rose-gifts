import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts/Autumn-in-November.ttf';
import './fonts/Bold-&-Stylish-Calligraphy.ttf';
import './fonts/Flower-Shop-TTF.ttf';
import './fonts/JandaSwirlyTwirly.ttf';
import './fonts/Lumberjack-Regular.ttf';
import './fonts/October-Twilight.ttf';
import './fonts/OhMyItsJuly-TTF.ttf';
import './fonts/Unicorn-Calligraphy-TTF.ttf';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
