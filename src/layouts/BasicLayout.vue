<template>
    <HeadPrimary />

    <div id="mainContainer" class="inner-wrapper">
        <Sidebar v-if="log.logins"/>

        <main id="contentView">
            <slot></slot>
        </main> <!-- #contentView -->
    </div> <!-- #mainContainer -->

    <FootPrimary />

    <SpinLoader :isLoading="isLoading.state" />
    <FloatingButton />
</template> <!-- Template Ends -->

<script setup>
    import { useLoaderStore } from '../stores/isLoading';
    import { userLogin } from '../stores/isLogin';
    import HeadPrimary from './HeadPrimary.vue';
    import FootPrimary from './FootPrimary.vue';
    import Sidebar from './Sidebar.vue';
    import SpinLoader from '../components/commons/SpinLoader.vue';
    import FloatingButton from './FloatingButton.vue';

    const isLoading = useLoaderStore();
    const log = userLogin();
</script> <!-- Logic Ends -->