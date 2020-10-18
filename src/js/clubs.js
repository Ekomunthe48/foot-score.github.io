import dbPromise from './db'
import { fetchApi, competitionUcl } from './fetchApi'

export default function clubs() {
  const getAllClubs = () => {
    if ("caches" in window) {
      caches.match(competitionUcl + "teams").then(response => {
        if (response) {
          response.json().then(data => {
            showClub(data);
          })
        }
      })
    }
    fetchApi(competitionUcl + "teams")
      .then(data => {
        showClub(data);
      })
      .catch(error => {
        console.log(error)
      })
  }

  function showClub(data) {
    let teams = "";
    const teamElement = document.getElementById("teams");

    data.teams.forEach(function (team) {
      teams += `
  
              <div class="card" >
                  <div class="card-image waves-effect waves-block waves-light">
                      <img class="lazyload" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" style="padding: 16px; margin: auto; height: 135px; width: 135px">
                  </div>
                <div class="card-content">
                  <h5>${team.name}</h5>
                  <p>Founded  : ${team.founded}</p>
                  <p>Colors   : ${team.clubColors}</p>
                  <p>Stadium  : ${team.venue}</p>
                </div>
              </div>
  
            `
    })
    teamElement.innerHTML = teams
  }
  getAllClubs()
}
