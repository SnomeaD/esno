<template>
    <tr :class="classStyleLite">
      <td :class="[classStyle,'summary-toon']"><a :href="armoryLink">{{toon.name}}</a></td>
      <td class="spacer">
        <div></div>
      </td>
      <td><img :src="iconLink(toon.spec.icon)" height="20" width="20"/></td>
      <td class="spacer">
        <div></div>
      </td>
      <td>{{toon.averageItemLevelEquipped}}</td>
      <td class="spacer">
        <div></div>
      </td>
      <td>{{toon.averageItemLevel}}</td>
      <td class="spacer">
        <div></div>
      </td>
      <td :class="artifactStyle">{{toon.artifactTrait}}</td>
      <td class="spacer">
        <div></div>
      </td>
      <td>
        <div class="esno-tooltip">
            <i class="fa fa-times" v-if="toon['audit'].problems.length"></i><i class="fa fa-check" v-if="!toon['audit'].problems.length"></i>
            <span class="esno-tooltip-text audit" v-if="toon['audit'].problems.length">
                <div v-for="problem in toon.audit.problems">
                    <img class="audit-icon" :src="iconLink(problem.icon)" height="20" width="20"/>
                    <span class="audit_text">{{problem.slot}}: {{problem.message}}</span>
                </div>
            </span>
        </div>
      </td>
      <td class="spacer">
        <div></div>
      </td>
      <td><i class="fa fa-check" v-if="toon['challengingLook']"></i></td>
    </tr>
</template>

<script>
import mixin from '../mixin/wowTools';
export default {
    mixins: [mixin],
    computed: {
        artifactStyle: function () {
            return (this.toon.artifactTrait > 74)?'completed':'';
        }
    }
}
</script>
<style>
    .completed{
        font-weight: bold;
    }
</style>

