/* eslint-disable import/no-unresolved */
import 'materialize-css/dist/css/materialize.min.css';
import '../style/index.css';
import Main from './view/nav';
import Sw from './source/sw';
// eslint-disable-next-line import/extensions
import 'materialize-css/dist/js/materialize.min.js';

window.addEventListener('DOMContentLoaded', () => {
  Main();
  Sw();
});
