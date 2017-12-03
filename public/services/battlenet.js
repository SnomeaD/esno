import axios from 'axios';
export default {
    getProgress: function(server,toonname){
        return axios.get('/bnet/progress/'+server+'/'+toonname)
            .then(function (response) {
              return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
    getGuildToons: function(server,guildName){
        return axios.get('/bnet/guild/'+server+'/'+guildName)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    },
    getToon: function(server,toonname){
        return axios.get('/bnet/toon/'+server+'/'+toonname)
            .then(function (response) {
                return response.data;
            })
            .catch(function (error) {
                return error;
            });
    }
}