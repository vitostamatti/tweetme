import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ProfileBadgeComponent } from './profiles'
import { FeedComponent, TweetsComponent, TweetDetailComponent } from './tweets'

const appElement = document.getElementById('root')

if (appElement) {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    appElement
  );
}

const e = React.createElement

const tweetsElement = document.getElementById('tweetme')
if (tweetsElement) {
  ReactDOM.render(
    e(TweetsComponent, tweetsElement.dataset), tweetsElement);
}

const tweetsFeedElement = document.getElementById('tweetme-feed')
if (tweetsFeedElement) {
  ReactDOM.render(
    e(FeedComponent, tweetsFeedElement.dataset), tweetsFeedElement);
}

const tweetDetailElements = document.querySelectorAll(".tweetme-detail")

tweetDetailElements.forEach(container => {
  ReactDOM.render(
    e(TweetDetailComponent, container.dataset),
    container
  );
})

const userProfileBadgeElements = document.querySelectorAll(".tweetme-profile-badge")

userProfileBadgeElements.forEach(container => {
  ReactDOM.render(
    e(ProfileBadgeComponent, container.dataset),
    container
  );
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

