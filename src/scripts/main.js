/* eslint-disable import/no-unresolved */
import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'materialize-css/dist/css/materialize.min.css';
import '../style/index.css';
import Main from './view/nav';
import Sw from './source/swScript';
// eslint-disable-next-line import/extensions
import 'materialize-css/dist/js/materialize.min.js';

window.addEventListener('DOMContentLoaded', () => {
  Main();
  Sw();
});
