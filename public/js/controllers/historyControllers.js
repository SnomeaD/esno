'use strict';

/* Controllers */

var historyControllers = angular.module('historyControllers', ["chart.js"]);
historyControllers.controller('historyController', ['$scope', '$http','battleNetService',
  function($scope,$http,battleNetService) {
    var toons = [
        {server:'sargeras', name:'Snomead'},
        {server:'sargeras', name:'Snominette'},
        // {server:'sargeras', name:'Sno'},
        // {server:'sargeras', name:'Snômead'},
        // {server:'sargeras', name:'Snomeadine'},
        // {server:'nerzhul', name:'Snomead'},
        // {server:'garona', name:'Snomead'},
        // {server:'sargeras', name:'Snoméàd'},
        // {server:'sargeras', name:'Dromead'},
        // {server:'sargeras', name:'Snomeadée'},
        // {server:'sargeras', name:'Snømead'},
        // {server:'sargeras', name:'Snomeadille'},
        // {server:'sargeras', name:'Snommead'},
        {server:'sargeras', name:'Snomeadh'}
    ];
// 6/10*18 Level 10
// 7/20*28 Level 20
// 8/30*35 Level 30
// 9/40*40 Level 40
// 10/50*50 Level 50
// 11/60*60 Level 60
// 12/70*115 Level 70
// 13/80*200 Level 80
// 557/82*187 superior
// 556/83*213 epic
// 4828/85*450 Level 85
// 5373/87*333 cataclysmically-superior
// 5372/88*359 cataclysmically-epic
// 6193/90*463 Level 90
// 6348/92*450 mystically-superior
// 6349/95*476 mystically-epic
// 9060/100*655 Level 100
// 9707/104*608 savagely-superior
// 9708/107*640 savagely-epic
// 10671/110*825 Level 110
// 10764/114*790 brokenly-superior
// 10765/117*840 brokenly-epic
    $scope.toonsData = [];
    const historyAchievements = [6,7,8,9,10,11,12,13,557,556,4828,5373,5372,6193,6348,6349,9060,9707,9708,10671,10764,10765];
    const historyAchievementsValue = {
        6: 10,
        7: 20,
        8: 30,
        9: 40,
        10: 50,
        11: 60,
        12: 70,
        13: 80,
        557: 82,
        556: 83,
        4828: 85,
        5373: 87,
        5372: 88,
        6193: 90,
        6348: 92,
        6349: 95,
        9060: 100,
        9707: 104,
        9708: 107,
        10671: 110,
        10764: 114,
        10765: 117
    };
    $scope.data = [];
    toons.forEach( function (toon){
        battleNetService.getHistory(toon.server,toon.name)
        // then() called when son gets back
        .then(function(data) {
            // promise fulfilled
            if ('ok' === data.status) {
                let history = [];
                data.achievements.achievementsCompleted.forEach(function (achievement,index) {
                    if(historyAchievements.includes(achievement)){
                        history.push(
                            {
                                'x':data.achievements.achievementsCompletedTimestamp[index],
                                'y':historyAchievementsValue[achievement],
                                'label':data.achievements.achievementsCompleted[index]
                            });
                    }
                });
                history.sort();
                $scope.toonsData.push({
                    'name': data.name,
                    'realm': data.realm,
                    'class': data.class,
                    'history':history
                });
                
                $scope.data.push(history);

            } else {
                $scope.error = data.reason;
            }
        }, function(error) {
            // promise rejected, could log the error with: console.log('error', error);
            $scope.error = error;
        });
    });
    $scope.options = {
        fill:false,
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM D YYYY, HH:mm'
                    }
                }
            }]
        }
    };
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
  }]);