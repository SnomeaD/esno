<template>
    <div>
        <div class="container-fluid">
            <div class="row" v-if="toons">
                <table class="summary-raid">
                    <tbody>
                        <tr class="icons">
                            <td class="summary">
                                <div/>
                            </td>
                            <td class="spacer">
                                <div/>
                            </td>
                            <td class="en">
                                <div class="icon">Emerald Nightmare</div>
                            </td>
                            <td class="spacer">
                                <div/>
                            </td>
                            <td class="tov">
                                <div class="icon">Trial of Valor</div>
                            </td>
                            <td class="spacer">
                                <div/>
                            </td>
                            <td class="nh">
                                <div class="icon">Nigthold</div>
                            </td>
                            <td class="spacer">
                                <div/>
                            </td>
                            <td class="tos">
                                <div class="icon">Tomb of Sargeras</div>
                            </td>
                            <td class="spacer">
                                <div/>
                            </td>
                            <td class="ant">
                                <div class="icon">Antorus</div>
                            </td>
                        </tr>
                        <progress-toon-row
                            v-for="(toon, index) in orderedToons"
                            :toon="toon"
                            :key="index"
                        />
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import progressToonRow from '../components/progressToonRow.vue';
import _ from 'lodash';
export default {
    components: {
        progressToonRow
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
            return _.orderBy(this.toons, 'artifactTrait', 'desc');
        }
    }
};

</script>
