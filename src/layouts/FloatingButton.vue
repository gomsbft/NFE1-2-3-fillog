<template>
    <aside id="floatButtonContainer">
        <div>
            <button class="floating-opener">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-close-large-line"></use>
                </svg>
            </button>
        </div>

        <button type="button" class="floating-button" v-if="currentUser?.state.userID === blogAdmin._id" title="블로그 관리">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-settings-4-fill"></use>
            </svg>

            <span>블로그 관리</span>
        </button>

        <button type="button" class="floating-button" v-else @click="router.push('/userinfo')" title="블로그 정보">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-information-2-fill"></use>
            </svg>

            <span>블로그 정보</span>
        </button>

        <button type="button" class="floating-button" v-if="currentUser?.state.userID === blogAdmin._id" @click="router.push('/posts/write')" title="글쓰기">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-quill-pen-fill"></use>
            </svg>

            <span>글쓰기</span>
        </button>

        <button type="button" class="floating-button" v-else @click="didIFollowed = !didIFollowed; console.log('임시 팔로우 기능')" :title="didIFollowed ? '언팔로우' : '팔로우'">
            <svg class="remix">
                <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ didIFollowed ? 'heart-add-fill' : 'dislike-fill' }`"></use>
            </svg>

            <span>{{ didIFollowed ? '팔로우' : '언팔로우' }}</span>
        </button>

        <button type="button" class="floating-button" @click="router.push('/userinfo')">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-search-fill"></use>
            </svg>

            <span>글쓴이 정보</span>
        </button>
    </aside> <!-- #floatButtonContainer -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useUserStore } from '../stores/userInfo';
    import { getAdminInfo } from '../utilities/dataQueries';

    const router = useRouter();
    const blogAdmin = ref(await getAdminInfo()); // 블로그 관리자 정보 가져오기
    const currentUser = useUserStore(); // 로그인 사용자 정보 Store
    const didIFollowed = ref(false); // 임시 팔로우 정보
</script> <!-- Logic Ends -->