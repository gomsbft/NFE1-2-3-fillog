<template>
    <div class="user-name-tag">
        <div class="user-profile-image">
            <img v-if="thisUser?.userImage" :src="`http://localhost:3000/${ thisUser.userImage }`" alt="사용자 프로파일 이미지">

            <svg v-else class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
            </svg>
        </div>

        <p class="user-name">
            <span>{{ thisUser.userName ? thisUser.userName : '(알 수 없음)' }}</span>
        </p>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { getUserInfo } from '../../utilities/dataQueries';

    const props = defineProps([ 'userId' ]); // prop으로 받은 user ID를 가지고 사용자 정보 fetch, 프로파일 이미지와 이름 정보를 가지고 온다
    const thisUser = await getUserInfo(props.userId);
    console.log(thisUser)
</script> <!-- Logic Ends -->