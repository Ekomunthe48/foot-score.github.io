const base_url = "https://api.football-data.org/v2/";
const api_key = "9620be29cf5342b7b0762abb3142c6d4"

// Table UCL
const sa_id = 2019

const competitionUcl = `${base_url}competitions/${sa_id}/`

const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_key
    }
  })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status)
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
}

const showStanding = (data) => {
  let standings = "";
  let standingElement = document.getElementById("competitions");
  data.standings[0].table.forEach(function (standing) {
    standings += `
                <tr>
                  <td>${standing.position}</td>
                  <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
                  ${standing.team.name}</td>
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
        `
  })
  standingElement.innerHTML = ` 
    <div class="card">
          <table class="striped responsive-table">
              <thead>
                  <tr>
                    <th>Pos</th>
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
      </div> 
      `
}

function getAllStandings() {
  if ("caches" in window) {
    caches.match(competitionUcl + "standings").then(response => {
      if (response) {
        response.json().then(data => {
          console.log("Competition Data: " + data);
          showStanding(data);
        })
      }
    })
  }
  fetchApi(competitionUcl + "standings")
    .then(data => {
      showStanding(data);
    })
    .catch(error => {
      console.log(error)
    })
}
