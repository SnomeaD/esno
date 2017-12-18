<template>
    <div>
        <div class="container-fluid">
            <div class="row" v-if="toons">
                <table class="summary-raid">
                    <tbody>
                    <tr class="icons">
                        <td class="summary">
                            <div></div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="en">
                            <div class="icon">Emerald Nightmare</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="tov">
                            <div class="icon">Trial of Valor</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="nh">
                            <div class="icon">Nigthold</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="tos">
                            <div class="icon">Tomb of Sargeras</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="ant">
                            <div class="icon">Antorus</div>
                        </td>
                    </tr>
                    <progress-toon-row v-for="toon in orderedToons" :toon="toon" :key="toon.averageItemLevelEquipped"></progress-toon-row>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/wowTools';
import progressToonRow from '../components/progressToonRow.vue';
export default {
    components:{
        progressToonRow
    },
    props: {
        toons:Array
    },
    computed: {
        orderedToons: function () {
            return _.orderBy(this.toons, 'averageItemLevelEquipped', 'desc')
        }
    }
}

</script>

