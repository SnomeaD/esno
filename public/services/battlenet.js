export default {
  getToon(server,name) {
    return axios.get('/bnet/toon/'+server+'/'+name)
        .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}