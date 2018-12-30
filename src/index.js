import React from 'react';
import ReactDOM from 'react-dom';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'uikit/dist/js/uikit-icons.min.js';
import './index.css';
import WebFont from 'webfontloader';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

WebFont.load({
    google: {
        families: ['Lora:400,400i,700&amp;subset=latin-ext', 'sans-serif']
    }
});

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
