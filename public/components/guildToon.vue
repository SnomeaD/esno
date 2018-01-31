<template>
    <div class="container-fluid">
        <div class="row" v-if="toons">
            <table class="summary-raid">
                <tbody>
                    <tr class="icons">
                        <td class="name">
                            <div/>
                        </td>
                        <td class="spacer">
                            <div/>
                        </td>
                        <td class="spec">
                            <div/>
                        </td>
                        <td class="spacer">
                            <div/>
                        </td>
                        <td class="ilvle">
                            <div>equi</div>
                        </td>
                        <td class="spacer">
                            <div/>
                        </td>
                        <td class="ilvl">
                            <div>max</div>
                        </td>
                        <td class="spacer">
                            <div/>
                        </td>
                        <td class="audit">
                            <div>traits</div>
                        </td>
                        <td class="spacer">
                            <div/>
                        </td>
                        <td class="audit">
                            <div>audit</div>
                        </td>
                        <td class="spacer">
                            <div/>
                        </td>
                        <td class="challenge">
                            <div>challenge</div>
                        </td>
                    </tr>
                    <guild-toon-row
                        v-for="(toon, index) in orderedToons"
                        :toon="toon"
                        :key="index"
                    />
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
import guildToonRow from '../components/guildToonRow.vue';
import _ from 'lodash';
export default {
    components: {
        guildToonRow
    },
    props: {
        toons: {
            type: Array,
            default () { return []; },
            require: true
        }
    },
    computed: {
        orderedToons: function () {
            return _.orderBy(this.toons, 'averageItemLevelEquipped', 'desc');
        }
    }
};
</script>
