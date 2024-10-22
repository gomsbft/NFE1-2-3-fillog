<template>
    <aside id="spinLoader" v-if="props.isLoading">
        <div>
            loading...
        </div>
    </aside> <!-- #spinLoader -->
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'isLoading' ]);
</script> <!-- Logic Ends -->