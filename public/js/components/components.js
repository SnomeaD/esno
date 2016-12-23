'use strict';

/* Components */

angular.module('components', [])
  .component('toonViewProgress', {  
      templateUrl: 'components/toonViewProgress.jade',
      bindings: {
          toon: '<'
      }
}).component('bossesList', {
      templateUrl: 'components/bossesList.jade',
      bindings: {
          progress: '<'
      }
});