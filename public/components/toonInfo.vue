<template>
    <div :class="classStyle" class="row">
        <div class="summary-toon">{{toon.name}}</div>
        <div>{{toon.averageItemLevelEquipped}}/{{toon.averageItemLevel}}</div>
        <div>{{toon.artifactTrait}}</div>
        <div>Challenge:<i v-if="toon['challengingLook']" class="fa.fa-check"></i></div>
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
        }
    },
    data () {
        return {}
    }
}
</script>

