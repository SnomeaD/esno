<template>
    <tr :class="classStyleLite">
        <td :class="[classStyle,'summary-toon']"><img class="img-circle img-avatar" :src="toon.thumbnail" height="64px" width="64px"/>
            <div class="toon-info">
                <div>
                    <h5>{{toon.name}}</h5>
                </div>
                <div>{{toon.realm}}</div>
                <div>{{toon.averageItemLevelEquipped}}/{{toon.averageItemLevel}}</div>
            </div>
        </td>
        <template v-for="raid in toon.progress">
            <td class="spacer">
                <div></div>
            </td>
            <td :class="[classStyleLite, 'status']">
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'lfr'"></progress-toon-row-raid>
                </div>
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'normal'"></progress-toon-row-raid>
                </div>
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'heroic'"></progress-toon-row-raid>
                </div>
                <div class="status">
                    <progress-toon-row-raid :raid="raid" :difficulty="'mythic'"></progress-toon-row-raid>
                </div>
            </td>
        </template>
    </tr>
</template>
<script>
import mixin from '../mixin/wowTools';
import progressToonRowRaid from '../components/progressToonRowRaid.vue';
export default {
    mixins: [mixin],
    components:{
        progressToonRowRaid
    }
}
</script>

