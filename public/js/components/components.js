'use strict';

/* Components */

angular.module('components', [])
.component('summaryStatusDetail', {
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