function showClub(data) {
  let teams = "";
  let teamElement = document.getElementById("teams");
  data.teams.forEach(function (team) {
    teams += `
          <div class="card large">
            <a href="./detail.html?id=${team.id}">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px">
              </div>
            </a>
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

function getAllClubs() {
  if ("caches" in window) {
    caches.match(competitionUcl + "teams").then(response => {
      if (response) {
        response.json().then(data => {
          console.log("Club Data: " + data);
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

function detailClub(data) {
  let clubs = ""
  let clubsElement = document.getElementById("body-content")
  clubs = `<div class="card large">
              <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src="${data.crestUrl}" width="100%">
              </div>
              <div class="card-content">
                  div.
                  <h3>${data.name}</h3>
                  <p>Founded      : ${data.founded}</p>
                  <p>Website      : ${data.website}</p>
                  <p>Club Colors  : ${data.clubColors}</p>
                  <p>Stadium      : ${data.venue}</p>
                  <p>Email        : ${data.email}</p>
              </div>
            </div>
  
  `
  clubsElement.innerHTML = clubs
}

const teamDetail = `${base_url}teams/`

function getDetailClub(data) {
  let idTeams = "";
  data.teams.forEach(function (idTeam) {
    idTeams = idTeam.id
  })

  if ("caches" in window) {
    caches.match(teamDetail + idTeams).then(response => {
      if (response) {
        response.json().then(data => {
          console.log("Club Data: " + data);
          detailClub(data);
        })
      }
    })
  }
  fetchApi(teamDetail + idTeams)
    .then(data => {
      console.log(data)
      detailClub(data);
    })
    .catch(error => {
      console.log(error)
    })


}