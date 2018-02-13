import axios from 'axios';
import cachios from 'cachios';

const cachiosInstance = cachios.create(axios);

const ttl=600;
export default {
    getProgress: function (server, toonname) {
        return cachiosInstance.get('/bnet/progress/' + server + '/' + toonname,{ttl:ttl})
            .then(function (response) {
                return response.data;
            })
    },
    getGuildToons: function (server, guildName) {
        return cachiosInstance.get('/bnet/guild/' + server + '/' + guildName,{ttl:ttl})
            .then(function (response) {
                return response.data;
            })
    },
    getToon: function (server, toonname) {
        return cachios.get('/bnet/toon/' + server + '/' + toonname,{ttl:ttl})
            .then(response => {
                return response.data;
            });
    }
};
