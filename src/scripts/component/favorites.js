import swal from 'sweetalert';
import { showLoader, hideLoader } from './preloader';
import dbPromise from './db';

export default function favorites() {
  const Content = document.getElementById('body-content');
  const title = document.getElementById('headerTitle');
  let _dataTeams = null;

  const loadFavoriteTeams = () => {
    showLoader();
    const html = `
          <a class="waves-effect waves-light btn-small red darken-4" id="delete">Clear All Your Favorites</a>
          <div class="row" id="yourFavorite" style="margin-top: 16px;"></div>`;
    Content.innerHTML = html;
    title.innerHTML = 'My Favorites Teams';
    document.getElementById('delete').addEventListener('click', () => {
      deletesAllFavoriteTeam();
    });
    renderFavorite(); // render favorited teams
    hideLoader();
  };
  function renderFavorite() {
    dbPromise.then((db) => {
      const tx = db.transaction('clubs', 'readwrite').objectStore('clubs');
      return tx.getAll() || [];
    })
      .then((team) => {
        _dataTeams = team;
        const listFavorite = document.getElementById('yourFavorite');
        if (team.length) {
          let _favorite = '';
          // eslint-disable-next-line no-shadow
          team.forEach((team) => {
            _favorite += `
            <div class="col s12 m6 l4">
                <div class="card" id="card-${team.id}" >
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="lazyload" src="${team.crestUrl}" style="padding: 16px; margin: auto; height: 135px; width: 135px">
                        <a class="btn-floating btn-medium halfway-fab waves-effect waves-light red remove" data-id="${team.id}">
                            <i id="card-${team.id}" class="large material-icons">delete</i>
                        </a>
                    </div>
                  <div class="card-content">
                    <div class="center flow-text"><strong>${team.name}</strong></div>
                    <div class="center"><strong>Founded:</strong> ${team.founded}</div>
                    <div class="center"><strong>Color: </strong>${team.clubColors}</div>
                    <div class="center"><strong>Stadium: </strong>${team.venue}</div>
                    <div class="center"><a href="${team.website}" target="_blank"><strong>Website : </strong>${team.website}</a></div>
                  </div>
                </div>
            </div>`;

            listFavorite.innerHTML = _favorite;
            const removeFavorite = document.querySelectorAll('.remove');
            removeFavorite.forEach((element) => {
              element.addEventListener('click', (e) => {
                const getId = e.target.parentElement.dataset.id;
                removeFavoriteTeam(getId);
              });
            });
          });
        } else {
          listFavorite.innerHTML = '<h5 class="center-align">You have no favorite team! get one !</h5>';
        }
        hideLoader();
      });
  }

  function removeFavoriteTeam(teamId) {
    const teamObject = _dataTeams.filter((el) => el.id === parseInt(teamId))[0];

    dbPromise.then((db) => {
      const tx = db.transaction('clubs', 'readwrite');
      tx.objectStore('clubs').delete(parseInt(teamId));
    }).then(() => {
      const element = document.getElementById(`card-${teamId}`);
      element.parentNode.removeChild(element);
      swal({
        title: 'succes!',
        text: `Success Delete ${teamObject.name} From Your Favorite.`,
        icon: 'success',
        button: 'Ok!',
      });
    }).catch((e) => {
      swal({
        title: `Please Check Your Network.${e}`,
      });
    });
  }

  function deletesAllFavoriteTeam() {
    dbPromise.then((db) => {
      const tx = db.transaction('clubs', 'readwrite');
      const store = tx.objectStore('clubs').clear();
      return store;
    })
      .then(() => {
        loadFavoriteTeams();
        swal('Poof! Your favorites has been deleted!', {
          icon: 'success',
        });
      });
  }
  loadFavoriteTeams();
}
