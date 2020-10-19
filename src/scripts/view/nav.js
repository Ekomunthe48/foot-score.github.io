/* eslint-disable no-var */
import clubs from '../component/clubs';
import standings from '../component/standings';
import favorites from '../component/favorites';

const main = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems);
    loadNav();

    function loadNav() {
      const xhttp = new XMLHttpRequest();
      // eslint-disable-next-line func-names
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status !== 200) return;

          document.querySelectorAll('.topnav, .sidenav').forEach((elm) => {
            // eslint-disable-next-line no-param-reassign
            elm.innerHTML = xhttp.responseText;
          });

          document.querySelectorAll('.sidenav a, .topnav a').addEventListener('click', (event) => {
            const sidenav = document.querySelector('.sidenav');
            M.Sidenav.getInstance(sidenav).close();

            page = event.target.getAttribute('href').substr(1);
            loadPage(page);
          });
        }
      };
      xhttp.open('GET', 'nav.html', true);
      xhttp.send();
    }

    // eslint-disable-next-line no-var
    // eslint-disable-next-line vars-on-top
    let page = window.location.hash.substr(1);
    if (page === '') page = 'home';

    loadPage(page);
    function loadPage(page) {
      var xhttp = new XMLHttpRequest();
      // eslint-disable-next-line func-names
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          const content = document.querySelector('#body-content');

          if (page === 'home') standings();
          if (page === 'club') clubs();
          if (page === 'favorite') favorites();

          if (this.status === 200) {
            content.innerHTML = xhttp.responseText;
          } else if (this.status === 404) {
            content.innerHTML = '<p>Halaman tidak ditemukan.</p>';
          } else {
            content.innerHTML = '<p>Ups.. halaman tidak dapat diakses.</p>';
          }
        }
      };
      xhttp.open('GET', `pages/${page}.html`, true);
      xhttp.send();
    }
  });
};

export default main;
