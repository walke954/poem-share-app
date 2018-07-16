import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import './index.css';
import App from './components/App.js';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('main')
);

registerServiceWorker();