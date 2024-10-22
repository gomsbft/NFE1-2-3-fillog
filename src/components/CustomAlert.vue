<template>
    <aside id="stormCaller">
        커스텀 얼럿
    </aside> <!-- #stormCaller -->
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'alertType', 'message', 'isConfirm' ]); // 얼럿 종류, 얼럿 메시지, 확인이 필요한 얼럿인지 여부
</script> <!-- Logic Ends -->

<style lang="scss" scoped>

</style> <!-- Stylesheet Ends -->