<template>
    <HeadPrimary />

    <div id="mainContainer" class="inner-wrapper">
        <Sidebar />

        <main id="contentView">
            <slot></slot>
        </main> <!-- #contentView -->
    </div> <!-- #mainContainer -->

    <FootPrimary />

    <FloatingButton />
</template> <!-- Template Ends -->

<script setup>
    import HeadPrimary from './HeadPrimary.vue';
    import FootPrimary from './FootPrimary.vue';
    import Sidebar from './Sidebar.vue';
    import FloatingButton from './FloatingButton.vue';
</script> <!-- Logic Ends -->