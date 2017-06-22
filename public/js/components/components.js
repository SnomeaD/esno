'use strict';

/* Components */

angular.module('components', [])
  .component('toonViewProgress', {  
      templateUrl: 'components/toonViewProgress.jade',
      bindings: {
          toon: '<'
      }
}).component('summaryStatusDetail', {
      templateUrl: 'components/summaryStatusDetail.jade',
      bindings: {
          raid: '=',
          difficulty: '=',
      }
}).component('bossesList', {
      templateUrl: 'components/bossesList.jade',
      bindings: {
          progress: '<'
      }
});