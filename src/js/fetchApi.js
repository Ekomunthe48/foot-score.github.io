const config = {
  base_url : "https://api.football-data.org/v2/",
  api_key : "9620be29cf5342b7b0762abb3142c6d4",
  id : 2021
}


const competitionUcl = `${config.base_url}competitions/${config.id}/`

const fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': config.api_key
    }
  })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
};

export { fetchApi, competitionUcl }