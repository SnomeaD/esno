<template>
    <div class="jumbotron">
        <h3 class="display-3">
            <img
                class="img-avatar"
                :src="toon.thumbnail"
                alt="Avatar"
                height="64px"
                width="64px"
            > {{ toon.name }} - {{ toon.realm }}
        </h3>
        <p class="lead">
            <img
                :src="iconLink(toon.spec.icon)"
                height="32"
                width="32"
            > {{ toon.spec.name }}
        </p>
        <hr class="my-4">
        <p>
            Ilvl:{{ toon.averageItemLevelEquipped }}/{{ toon.averageItemLevel }}<br>
            Artifact trait: {{ toon.artifactTrait }}<br>
            Challenge:<i v-if="toon['challengingLook']" class="fa fa-check"/><br>
            Audit:<i v-if="toon.audit.problems.length === 0" class="fa fa-check"/><br>
            mmScore: {{ toon.mmScore }}<br>
        </p>
        <div v-for="problem in toon.audit.problems" :key="problem.slot">
            <img
                :src="iconLink(problem.icon)"
                height="20"
                width="20"
                class="audit-icon">
            <span>{{ problem.slot }}: {{ problem.message }}</span>
        </div>
        <p class="lead">
            <a
                class="btn btn-primary btn-lg"
                :href="armoryLink"
                role="button"
            >Armory</a>
        </p>
    </div>
</template>

<script>
import mixin from '../mixin/wowTools';
export default {
    mixins: [mixin]
};
</script>
