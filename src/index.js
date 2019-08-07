import { createElement as h } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(h(App), document.getElementById('root'));

serviceWorker.unregister();
