<template>
    <div class="row">
        <span>{{toon.name}}</span>
        <div :class="toon.class" class="summary-toon"></div>
        <span>{{toon.averageItemLevelEquipped}}/{{toon.averageItemLevel}}</span>
        <span>{{toon.artifactTrait}}</span>
        <i v-if="toon['challengingLook']" class="fa.fa-check"></i>
    </div>
</template>


<script>
    export default {
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
        data () {
            return {}
        }
    }
</script>

