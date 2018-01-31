export default {
    props: {
        toon: Object
    },
    computed: {
        // a computed getter
        classStyle () {
            // `this` points to the vm instance
            return this.wowClassToCss(this.toon.class);
        },
        classStyleLite () {
            // `this` points to the vm instance
            return this.wowClassToCss(this.toon.class) + '-lite';
        },
        armoryLink () {
            return 'https://worldofwarcraft.com/en-gb/character/' + this.sanitizeRealm(this.toon.realm) + '/' + this.toon.name;
        }
    },
    methods: {
        wowClassToCss: function (classNumber) {
            if (classNumber) {
                const classesData = [
                    {'name': 'Warrior', 'cssClass': 'warrior'},
                    {'name': 'Paladin', 'cssClass': 'paladin'},
                    {'name': 'Hunter', 'cssClass': 'hunter'},
                    {'name': 'Rogue', 'cssClass': 'rogue'},
                    {'name': 'Priest', 'cssClass': 'priest'},
                    {'name': 'Death Knight', 'cssClass': 'death-knight'},
                    {'name': 'Shaman', 'cssClass': 'shaman'},
                    {'name': 'Mage', 'cssClass': 'mage'},
                    {'name': 'Warlock', 'cssClass': 'warlock'},
                    {'name': 'Monk', 'cssClass': 'monk'},
                    {'name': 'Druid', 'cssClass': 'druid'},
                    {'name': 'Demon Hunter', 'cssClass': 'demon-hunter'}
                ];
                return classesData[classNumber - 1].cssClass;
            }
        },
        sanitizeRealm: function (realm) {
            return realm.replace(/\s/g, '').replace(/'/g, '');
        },
        iconLink: function (icon) {
            return this.toon.iconPath + icon + '.jpg';
        }
    }
};
