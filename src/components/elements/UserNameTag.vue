<template>
    <div class="user-name-tag">
        <div class="user-profile-image">
            <img :src="thisUser ? thisUser.userImage : '/src/assets/images/unknown-user.jpg'" alt="사용자 프로파일 이미지">
        </div>

        <p class="user-name">
            <span>{{ thisUser ? thisUser.userName : '(알 수 없음)' }}</span>
        </p>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import userData from '../../datas/userData.json';

    const props = defineProps([ 'userId' ]); // prop으로 받은 user ID를 가지고 사용자 정보 fetch, 프로파일 이미지와 이름 정보를 가지고 온다
    const thisUser = userData.find(user => user.id === parseInt(props.userId));
</script> <!-- Logic Ends -->

<style lang="scss" scoped>

</style> <!-- Stylesheet Ends -->