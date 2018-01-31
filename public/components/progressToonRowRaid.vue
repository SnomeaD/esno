<template>
    <div>
        <div :class="[raidDifficulty, 'esno-tooltip']">
            {{ raid.summary[difficulty].kill }}/{{ raid.bosses.length }}
            <span class="esno-tooltip-text">
                <div v-for="boss in raid.bosses" :key="boss.name">
                    <span :class="getClasses(boss)">{{ boss[difficulty+'Kills'] }}x {{ boss.name }}</span>
                </div>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        raid: {
            type: Object,
            default () { return {}; },
            require: true
        },
        difficulty: {
            type: String,
            default: '',
            require: true
        }
    },
    computed: {
        raidDifficulty () {
            return this.raid.summary[this.difficulty].status;
        }
    },
    methods: {
        getClasses (boss) {
            let classes = '';
            classes += boss[this.difficulty + 'Kills'] ? this.difficulty + ' ' : '';
            classes += boss[this.difficulty + 'DeadThisWeek'] ? 'bossKilledThisWeek ' : '';
            return classes;// {'bossKilled':boss[difficulty+'Kills']}"
        }
    }
};
</script>
