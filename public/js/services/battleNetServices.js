const battleNetServices = angular.module('battleNetServices', []);
battleNetServices.factory('battleNetService', function ($http, $q) {
        return {
            getProgress: function(server,toonname){
                return $http.get('/bnet/progress/'+server+'/'+toonname)
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response.data);
                        }
                    }, function(response) {
                        // something went wrong
                        return $q.reject(response.data);
                    });
            },
            getFashion: function(){
                return $http.get('/bnet/transmogfashion')
                    .then(function(response) {
                        if (typeof response.data === 'object') {
                            return response.data;
                        } else {
                            // invalid response
                            return $q.reject(response);
                        }
                    }, function(response) {
                        // something went wrong
                        return $q.reject(response);
                    });
            },
        };
    });