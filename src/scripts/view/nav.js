/* eslint-disable no-var */
import clubs from '../component/clubs';
import standings from '../component/standings';
import favorites from '../component/favorites';

const main = () => {
  console.log('DOMContentLoaded');
  loadNav();
  function loadNav() {
    const xhttp = new XMLHttpRequest();
    // eslint-disable-next-line func-names
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;

        const topnav = document.querySelector('.topnav');
        topnav.innerHTML = xhttp.responseText;

        topnav.addEventListener('click', (event) => {
          page = event.target.getAttribute('href').substr(1);
          loadPage(page);
        });
      }
    };
    xhttp.open('GET', 'nav.html', true);
    xhttp.send();
  }

  loadMobile();
  function loadMobile() {
    const xhttp = new XMLHttpRequest();
    // eslint-disable-next-line func-names
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status !== 200) return;
        const navMobile = document.querySelector('#view-mobile');
        navMobile.innerHTML = xhttp.responseText;

        navMobile.addEventListener('click', (event) => {
          page = event.target.getAttribute('href').substr(1);
          loadPage(page);
        });
      }
    };
    xhttp.open('GET', 'mobile.html', true);
    xhttp.send();
  }

  // eslint-disable-next-line no-var
  // eslint-disable-next-line vars-on-top
  let page = window.location.hash.substr(1);
  if (page === '') page = 'home';

  loadPage(page);
  function loadPage(page) {
    if (page === 'home') standings();
    if (page === 'club') clubs();
    if (page === 'favorite') favorites();
  }
};

export default main;
