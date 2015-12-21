import './main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import Dashboard from './components/Dashboard.jsx';

ReactDom.render(<Dashboard />, document.querySelector('.person-list-container'));