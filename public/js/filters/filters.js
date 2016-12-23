'use strict';

/* Filters */

angular.module('filters', []).
  filter('class', function () {
    return function (classNumber) {
      if(classNumber){
        const classesData = [
          {"name":"Warrior", "cssClass":"warrior"},
          {"name":"Paladin", "cssClass":"paladin"},
          {"name":"Hunter", "cssClass":"hunter"},
          {"name":"Rogue", "cssClass":"rogue"},
          {"name":"Priest", "cssClass":"priest"},
          {"name":"Death Knight", "cssClass":"death-knight"},
          {"name":"Shaman", "cssClass":"shaman"},
          {"name":"Mage", "cssClass":"mage"},
          {"name":"Warlock", "cssClass":"warlock"},
          {"name":"Monk", "cssClass":"monk"},
          {"name":"Druid", "cssClass":"druid"},
          {"name":"Demon Hunter", "cssClass":"demon-hunter"}
        ];
        return classesData[classNumber-1].cssClass;
      }
    };
  }).
  filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    };
  });