<template>
    <div>
        <div :class="[classStyleLite,'row','toon-row']">
            <div :class="[classStyle,'col-md-1','summary-toon']">
                <span>{{toon.name}}</span>
            </div>
            <div class="col-md-1">
                <span>{{toon.averageItemLevelEquipped}}/{{toon.averageItemLevel}}</span>
            </div>
            <div class="col-md-1">
                <span>{{toon.artifactTrait}}</span>
            </div>
            <div class="col-md-1">
                <i class="fa fa-check" v-if="toon['challengingLook']"></i>
            </div>
            <div class="col-md-1">
                <div class="esno-tooltip">
                    <i class="fa fa-times" v-if="toon['audit'].problems.length"></i>
                    <i class="fa fa-check" v-if="!toon['audit'].problems.length"></i>
                    <span class="esno-tooltip-text audit" v-if="toon['audit'].problems.length">
                        <div v-for="problem in toon.audit.problems"><img class="audit-icon" :src="iconLink(problem.icon)" height="20" width="20"/>
                            <span>{{problem.slot}}: {{problem.message}}</span>
                        </div>
                    </span>
                </div>
            </div>
            <div class="col-md-1"><img :src="iconLink(toon.spec.icon)" height="20" width="20"/></div>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/wowTools';
export default {
    mixins: [mixin]
}
</script>

