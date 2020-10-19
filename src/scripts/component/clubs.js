import swal from 'sweetalert';
import { fetchApi, competitionUcl } from '../source/fetchApi';
import { showLoader, hideLoader } from './preloader';
import dbPromise from './db';

let teamsData = null;
const teamElement = document.getElementById('teams');

export default function clubs() {
  const getAllClubs = () => {
    showLoader();
    if ('caches' in window) {
      caches.match(`${competitionUcl}teams`).then((response) => {
        if (response) {
          response.json().then((data) => {
            showClub(data);
          });
        }
      });
    }
    fetchApi(`${competitionUcl}teams`)
      .then((data) => {
        showClub(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function showClub(data) {
    let teams = '';
    teamsData = data;

    dbPromise.then((db) => {
      const tx = db.transaction('clubs', 'readwrite').objectStore('clubs');
      const txFTeams = tx.getAll() || [];
      return txFTeams;
    })
      .then((team) => {
        showLoader();
        const favTeams = team.map((i) => i.id);
        function renderButton(teamId) {
          if (!favTeams.includes(teamId)) {
            return `
                  <a class="btn-floating btn-medium halfway-fab waves-effect waves-light green addFavorite"
                  >
                    <i id="icon-${teamId}" class="large material-icons" data-id="${teamId}">favorite</i>
                  </a>`;
          }
          return '';
        }
        data.teams.forEach((team) => {
          teams += `
    
                <div class="card" >
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="lazyload" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="padding: 16px; margin: auto; height: 135px; width: 135px">
                        ${renderButton(team.id)}
                    </div>
                  <div class="card-content">
                    <h5>${team.name}</h5>
                    <p>Founded  : ${team.founded}</p>
                    <p>Colors   : ${team.clubColors}</p>
                    <p>Stadium  : ${team.venue}</p>
                    <a href="${team.website}">${team.website}</a>
                  </div>
                </div>`;
          teamElement.innerHTML = teams;
          hideLoader();
          const addFavorite = document.querySelectorAll('.addFavorite');

          addFavorite.forEach((el) => {
            el.addEventListener('click', (e) => {
              const getId = e.target.dataset.id;
              addFavoriteTeam(getId);
            });
          });
        });
      });
  }

  function addFavoriteTeam(teamId) {
    // eslint-disable-next-line eqeqeq
    const teamObject = teamsData.teams.filter((el) => el.id == teamId)[0];
    dbPromise.then((db) => {
      const tx = db.transaction('clubs', 'readwrite');
      const store = tx.objectStore('clubs');
      store.add(teamObject);
      return tx.complete;
    })
      .then(() => {
        // remove the button
        const element = document.getElementById(`icon-${teamId}`);
        element.parentNode.remove();
        swal({
          title: 'succes!',
          text: `${teamObject.name} ditambahkan ke Team Favorit.`,
          icon: 'success',
          button: 'Ok!',
        });
      });
  }
  getAllClubs();
}
