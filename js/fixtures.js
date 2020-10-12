const showFixtures = (data) => {
    let fixtures = "";
    let fixturesElement = document.getElementById("fixtures");
    data.matches.forEach(function (match) {
        fixtures += `
                <thead>
                    <tr>
                        <th width="100px"></th>
                        <th class="center" width="100px"><h5>${match.utcDate}</h5></th>
                        <th width="100px"></th>
                    </tr>
                </thead>
                <tbody id="standings">
                    <tr>
                        <td class="center" width="100px">${match.homeTeam.name}</td>
                        <td class="center" width="100px">${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</td>
                        <td class="center" width="100px">${match.awayTeam.name}</td>
                    </tr>
                </tbody>
            
          `
    })
    fixturesElement.innerHTML = `
            <div class="section center">
                <table class="striped">
                    ${fixtures}
                </table>
            </div>
        `
}

function getAllMatches() {
    if ("caches" in window) {
        caches.match(competitionUcl + "matches").then(response => {
            if (response) {
                response.json().then(data => {
                    console.log("Matches Data: " + data);
                    showFixtures(data);
                })
            }
        })
    }
    fetchApi(competitionUcl + "matches")
        .then(data => {
            showFixtures(data);
        })
        .catch(error => {
            console.log(error)
        })
}

// const showFixtures = (data) => {
//     let fixtures = "";
//     let fixturesElement = document.getElementById("fixtures");
//     data.matches.forEach(function (match) {
//         fixtures += `
//                 <thead>
//                     <tr>
//                         <th width="100px"></th>
//                         <th class="center" width="100px"><h5>${match.utcDate}</h5></th>
//                         <th width="100px"></th>
//                     </tr>
//                 </thead>
//                 <tbody id="standings">
//                     <tr>
//                         <td class="center" width="100px">${match.homeTeam.name}</td>
//                         <td class="center" width="100px">${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}</td>
//                         <td class="center" width="100px">${match.awayTeam.name}</td>
//                     </tr>
//                 </tbody>
            
//           `
//     })
//     fixturesElement.innerHTML = `
//             <div class="section center">
//                 <table class="striped">
//                     ${fixtures}
//                 </table>
//             </div>
//         `
// }

// function getMatchesById() {
//     var idParam = urlParams.get("id");
//     if ("caches" in window) {
//         caches.match(competitionUcl + "matches" +idParam).then(response => {
//             if (response) {
//                 response.json().then(data => {
//                     console.log("Matches Data: " + data);
//                     showFixtures(data);
//                 })
//             }
//         })
//     }
//     fetchApi(competitionUcl + "matches")
//         .then(data => {
//             showFixtures(data);
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }