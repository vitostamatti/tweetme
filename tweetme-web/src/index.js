import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { TweetsComponent } from './tweets'

const appElement = document.getElementById('root')

if (appElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appElement
  );
}

const tweetsElement = document.getElementById('tweetme')
if (tweetsElement) {
  ReactDOM.render(
    <TweetsComponent />,
    tweetsElement
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

