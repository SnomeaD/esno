import axios from 'axios';
export default {
    getProgress: function (server, toonname) {
        return axios.get('/bnet/progress/' + server + '/' + toonname)
            .then(function (response) {
                return response.data;
            })
    },
    getGuildToons: function (server, guildName) {
        return axios.get('/bnet/guild/' + server + '/' + guildName)
            .then(function (response) {
                return response.data;
            })
    },
    getToon: function (server, toonname) {
        return axios.get('/bnet/toon/' + server + '/' + toonname)
            .then(response => {
                return response.data;
            });
    }
};
