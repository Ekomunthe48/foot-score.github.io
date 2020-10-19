import { fetchApi, competitionUcl } from '../source/fetchApi';
import { showLoader, hideLoader } from './preloader';

export default function standings() {
  const standingElement = document.getElementById('competitions');
  function getAllStandings() {
    showLoader();
    if ('caches' in window) {
      console.log('getting your data from system');
      caches.match(`${competitionUcl}standings`).then((response) => {
        if (response) {
          response.json().then((data) => {
            console.log(`Competition Data: ${data}`);
            showStanding(data);
          });
        }
      });
    }
    fetchApi(`${competitionUcl}standings`)
      .then((data) => {
        showStanding(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const showStanding = (data) => {
    let standings = '';
    data.standings[0].table.forEach((standing) => {
      standings += `
                  <tr>
                    <td>${standing.position}</td>
                    <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"></td>
                    <td>${standing.team.name}</td>
                    <td>${standing.playedGames}</td>
                    <td>${standing.won}</td>
                    <td>${standing.draw}</td>
                    <td>${standing.lost}</td>
                    <td>${standing.goalsFor}</td>
                    <td>${standing.goalsAgainst}</td>
                    <td>${standing.goalDifference}</td>
                    <td>${standing.points}</td>
                    <td>${standing.form}</td>
                  </tr>
          `;
    });
    standingElement.innerHTML = ` 
      <div class="card">
            <table class="striped responsive-table">
                <thead>
                    <tr>
                      <th>Pos</th>
                      <th></th>
                      <th>Team</th>
                      <th>P</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>F</th>
                      <th>A</th>
                      <th>+/-</th>
                      <th>PTS</th>
                      <th>Form</th>
                    </tr>
                </thead>
                <tbody id="standings">
                    ${standings}
                </tbody>
              </table>
        </div>`;
    hideLoader();
  };
  getAllStandings();
}
