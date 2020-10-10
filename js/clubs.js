function showClub(data) {
  let teams = "";
  let teamElement = document.getElementById("teams");
  data.teams[0].forEach(function (team) {
    teams += `
          <div class="card-image waves-effect waves-block waves-light">
              <img class="activator" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
          </div>
        `
  })
  teamElement.innerHTML = ` 
        <div class="card">
            ${teams}
        </div> 
      `
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
