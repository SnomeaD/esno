<template>
    <div class="container-fluid">
        <div class="row" v-if="toons">
            <table class="summary-guild">
                <thead>
                    <tr>
                        <th class="name">
                            <div/>
                        </th>
                        <th class="spec">
                            <div/>
                        </th>
                        <th class="spacer">
                            <div/>
                        </th>
                        <th class="audit">
                            <div>level</div>
                        </th>
                        <th class="spacer">
                            <div/>
                        </th>
                        <th class="ilvle">
                            <div>equi</div>
                        </th>
                        <th class="spacer">
                            <div/>
                        </th>
                        <th class="ilvl">
                            <div>max</div>
                        </th>
                        <th class="spacer">
                            <div/>
                        </th>
                        <th class="azerite">
                            <div>azerite</div>
                        </th>
                        <th class="spacer">
                            <div/>
                        </th>
                        <th class="audit">
                            <div>audit</div>
                        </th>
                        <th class="spacer">
                            <div/>
                        </th>
                        <th class="mmscore">
                            <div>mm+</div>
                        </th>
                        <th class="spacer">
                            <div/>
                        </th>
                    </tr>
                </thead>
                <tbody>
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
            return _.orderBy(this.toons, 'level', 'desc');
        }
    }
};
</script>
