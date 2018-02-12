<template>
    <tr :class="classStyleLite">
        <td :class="[classStyle,'summary-toon']">
            <img
                class="img-circle img-avatar"
                :src="toon.thumbnail"
                height="64px"
                width="64px"
            >
            <div class="toon-info">
                <div class="name-title"><a :href="armoryLink">{{ toon.name }}</a></div>
                <div class="legend">{{ toon.realm }}</div>
                <div class="legend">{{ toon.averageItemLevelEquipped }}/{{ toon.averageItemLevel }}</div>
                <div class="legend">Artifact: {{ toon.artifactTrait }}</div>
                <div class="legend">MM+: {{ toon.mmScore }}</div>
            </div>
        </td>
        <template v-for="(raid, index) in toon.progress">
            <td class="spacer" :key="index">
                <div/>
            </td>
            <td :class="[classStyleLite, 'status']" :key="index">
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'lfr'"/>
                </div>
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'normal'"/>
                </div>
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'heroic'"/>
                </div>
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'mythic'"/>
                </div>
            </td>
        </template>
    </tr>
</template>
<script>
import mixin from '../mixin/wowTools';
import progressToonRowRaid from '../components/progressToonRowRaid.vue';
export default {
    components: {
        progressToonRowRaid
    },
    mixins: [mixin]
};
</script>
