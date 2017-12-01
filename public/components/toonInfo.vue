<template>
    <div class="jumbotron">
        <h3 class="display-3"><img class="img-circle img-avatar" :src="toon.thumbnail" alt="Avatar" height="64px" width="64px"> {{toon.name}} - {{toon.realm}}</h3>
        <p class="lead"><img :src="iconLink(toon.spec.icon)" height="32" width="32"> {{toon.spec.name}}</p>
        <hr class="my-4">
        <p>
            Challenge:<i v-if="toon['challengingLook']" class="fa fa-check"></i><br/>
            Ilvl:{{toon.averageItemLevelEquipped}}/{{toon.averageItemLevel}}<br/>
            Artifact trait: {{toon.artifactTrait}}<br/>
            Audit:<br/>
            <div v-for="problem in toon.audit.problems">
                <img :src="iconLink(problem.icon)" height="20" width="20" class="audit-icon">
                <span>{{problem.slot}}: {{problem.message}}</span>
            </div>
        </p>
        <p class="lead">
            <a class="btn btn-primary btn-lg" :href="armoryLink" role="button">Armory</a>
        </p>
    </div>
</template>

<script>
import mixin from '../mixin/wowTools';
export default {
    mixins: [mixin],
    name: 'toonInfo',
    profile: {
        type: Object,
        default: function () {
            return {}
        }
    },
    props: {
        toon:Object
    },
    computed: {
        // a computed getter
        classStyle () {
            // `this` points to the vm instance
            return this.wowClassToCss(this.toon.class);
        },
        armoryLink () {
            return 'https://worldofwarcraft.com/en-gb/character/' + this.sanitizeRealm(this.toon.realm) + '/'+this.toon.name;
        },

    },
    data () {
        return {}
    },
    methods: { 
        iconLink : function(icon) {
            return this.toon.iconPath + icon +'.jpg';
        }
    }
}
</script>

