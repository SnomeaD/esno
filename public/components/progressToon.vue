<template>
    <div>
        <div class="container-fluid">
            <div class="row" v-if="toons">
                <table class="summary-raid">
                    <thead>
                        <tr class="icons">
                            <th class="summary">
                                <div/>
                            </th>
                            <th class="spacer">
                                <div/>
                            </th>
                            <th class="ul">
                                <div class="icon">Uldir</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
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
            return _.orderBy(this.toons, 'averageItemLevel', 'desc');
        }
    }
};

</script>
