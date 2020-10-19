import swal from 'sweetalert';
import { showLoader, hideLoader } from './preloader';
import dbPromise from './db';

export default function favorites() {
  const Content = document.getElementById('favs');
  let _dataTeams = null;

  const loadFavoriteTeams = () => {
    showLoader();
    const html = `
          <a class="waves-effect waves-light btn-small red darken-4" id="delete">Clear All Your Favorites</a>
          <div class="row" id="yourFavorite" style="margin-top: 16px;"></div>`;
    Content.innerHTML = html;
    document.getElementById('delete').addEventListener('click', () => {
      deletesAllFavoriteTeam();
    });
    renderFavoriteList(); // render favorited teams
    hideLoader();
  };
  function renderFavoriteList() {
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
                <div class="card" >
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="lazyload" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="padding: 16px; margin: auto; height: 135px; width: 135px">
                        <a class="btn-floating btn-medium halfway-fab waves-effect waves-light red remove" data-id="${team.id}">
                            <i id="card-${team.id}" class="large material-icons">delete</i>
                        </a>
                    </div>
                <div class="card-content">
                    <h5>${team.name}</h5>
                    <p>Founded  : ${team.founded}</p>
                    <p>Colors   : ${team.clubColors}</p>
                    <p>Stadium  : ${team.venue}</p>
                    <a href="${team.website}">${team.website}</a>
                </div>
                </div>`;

            listFavorite.innerHTML = _favorite;
            const removeFavorite = document.querySelectorAll('.remove');
            removeFavorite.forEach((el) => {
              el.addEventListener('click', (e) => {
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

  // <==delete one favorite==>
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
        text: `berhasil menghapus ${teamObject.name} dari Team Favorit.`,
        icon: 'success',
        button: 'Ok!',
      });
    }).catch((e) => {
      swal({
        title: `kesalahan!, cek jaringan anda.${e}`,
      });
    });
  }

  // delete allFavorites
  function deletesAllFavoriteTeam() {
    dbPromise.then((db) => {
      const tx = db.transaction('teams', 'readwrite');
      const store = tx.objectStore('teams').clear();
      return store;
    })
      .then(() => {
        loadFavoriteTeams();
        swal('Poof! Your favorites has been deleted!', {
          icon: 'success',
        });
      });
  }
}
