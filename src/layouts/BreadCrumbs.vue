<template>
    <aside id="breadCrumbs">
        <ul>
            <li v-for="(routeItem, index) in currentPath" :key="index">
                <RouterLink :to="routeItem.path">{{ routeItem.name }}</RouterLink>
            </li>
        </ul>
    </aside> <!-- #breadCrumbs -->
</template> <!-- Template Ends -->

<script setup>
    import { useRoute } from 'vue-router';

    const currentPath = useRoute().matched;
</script> <!-- Logic Ends -->