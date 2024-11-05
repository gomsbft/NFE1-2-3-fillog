<template>
    <div id="viewUserInfo">
        <p class="title">블로그 명</p>
        <h6 class="text">{{  blogAdmin.blogInfo.blogName  }}</h6>
        <p class="title">블로그 관리자</p>
        <p class="text">{{  blogAdmin.adminName }}</p>
        <p class="title">블로그 시작일</p>
        <p class="text">2024-10-25</p>
    </div> <!-- #viewUserInfo -->
</template> <!-- Template Ends -->

<script setup>
    import { getAdminInfo } from '../utilities/dataQueries';
    import { ref } from 'vue';

    const blogAdmin = ref(await getAdminInfo());
</script> <!-- Logic Ends -->