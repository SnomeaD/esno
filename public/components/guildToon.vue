<template>
    <div class="container-fluid">
        <div class="row" v-if="toons">
            <table class="summary-raid">
                <tbody>
                    <tr class="icons">
                        <td class="name">
                            <div></div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="spec">
                            <div></div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="ilvle">
                            <div>equi</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="ilvl">
                            <div>max</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="audit">
                            <div>traits</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="audit">
                            <div>audit</div>
                        </td>
                        <td class="spacer">
                            <div></div>
                        </td>
                        <td class="challenge">
                            <div>challenge</div>
                        </td>
                    </tr>
                    <guild-toon-row v-for="toon in orderedToons" :toon="toon" :key="toon.averageItemLevelEquipped"></guild-toon-row>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import mixin from '../mixin/wowTools';
import guildToonRow from '../components/guildToonRow.vue';
export default {
    components:{
        guildToonRow
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

