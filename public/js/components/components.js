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
}).component('rowToon', {
    templateUrl: 'components/rowToon.jade',
    bindings: {
        toon: '='
    }
});