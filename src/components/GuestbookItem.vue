<template>
    <li class="guestbook-item">
        <div class="guest-user-image-container">
            <img v-if="guestObject.writtenUser.isUser" class="guest-user-image" :src="thisUser.userImage" alt="방명록 작성자 프로파일 이미지">

            <svg v-else class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
            </svg>
        </div>

        <div class="guestbook-main-container">
            <div class="guest-info">
                <p class="guest-user-name">
                    {{ guestObject.writtenUser.isUser ? thisUser.userName : guestObject.writtenUser.userName }}
                </p>

                <p class="guest-written-date">
                    {{ dateFormat(guestObject.createdAt) }}
                </p>
            </div>

            <div class="guestbook-content">
                {{ guestObject.text }}
            </div>

            <div class="guestbook-reply-input" :class="setReplyStatus ? 'show' : null">
                <textarea :id="`txtReplyTo${ guestObject._id }`" rows="5" :placeholder="isUser ? '답글 입력...' : '먼저 로그인해 주세요.'" :disabled="!isUser"></textarea>

                <button type="button" class="button-guestbook-reply" title="답글 입력 완료" :disabled="!isUser" @click="guestReplyHandler()">
                    <span>입력완료</span>
                </button>
            </div>

            <div class="guestbook-control">
                <button type="button" class="button-guestbook-controls" title="방명록 글 삭제">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-delete-bin-line"></use>
                    </svg>

                    <span>글 삭제</span>
                </button>

                <span>·</span>

                <button type="button" class="button-guestbook-controls" title="답글 입력창 토글" @click="setReplyStatus = !setReplyStatus">
                    <svg class="remix">
                        <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ setReplyStatus ? 'close-large-line' : 'chat-3-line' }`"></use>
                    </svg>

                    <span>{{ setReplyStatus ? '답글 입력창 닫기' : '답글 작성' }}</span>
                </button>
            </div>

            <ul v-if="guestObject.replies?.length > 0" class="guestbook-reply-container">
                <slot></slot>
            </ul>
        </div>
    </li>
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import router from '../router';
    import { getUserInfo } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';

    const props = defineProps([ 'guestObject' ]);

    const setReplyStatus = ref(false);
    const isUser = false; // 임시 로그인 사용자
    const thisUser = await getUserInfo(props.guestObject.writtenUser.userID);

    const guestReplyHandler = () => {
        if (isUser === false) router.push('/login');

        console.log('답글 작성');
    }
</script> <!-- Logic Ends -->