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
                    {{ thisUser ? thisUser.userName : guestObject.writtenUser.userName }}
                </p>

                <p class="guest-written-date">
                    {{ new Date(guestObject.writtenDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                </p>
            </div>

            <div class="guestbook-content">
                {{ guestObject.text }}
            </div>

            <div class="guestbook-reply-input" :class="setReplyStatus ? 'show' : null">
                <textarea :id="`txtReplyTo${ guestObject.id }`" rows="5" :placeholder="isUser ? '답글 입력...' : '먼저 로그인해 주세요.'" :disabled="!isUser"></textarea>
            </div>

            <div class="guestbook-control">
                <button type="button" class="button-guestbook-controls">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-delete-bin-line"></use>
                    </svg>

                    <p>글 삭제</p>
                </button>

                <span>·</span>

                <button type="button" class="button-guestbook-controls" @click="setReplyStatus = !setReplyStatus">
                    <svg class="remix">
                        <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ setReplyStatus ? 'close-large-line' : 'chat-3-line' }`"></use>
                    </svg>

                    <p>{{ setReplyStatus ? '답글 입력창 닫기' : '답글 작성' }}</p>
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
    import userData from '../datas/userData.json';

    const props = defineProps([ 'guestObject' ]);

    const setReplyStatus = ref(false);
    const isUser = false; // 임시 로그인 사용자
    const thisUser = userData.find(user => user.id === parseInt(props.guestObject.writtenUser.userID));
</script> <!-- Logic Ends -->