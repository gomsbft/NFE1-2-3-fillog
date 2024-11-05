<template>
    <div class="reply-item">
        <div class="reply-info-container">
            <UserNameTag v-if="!!thisReply.userID" :user-id="thisReply.userID" />

            <div class="reply-user-tag" v-else>
                <div class="reply-user-image">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
                    </svg>
                </div>

                <p class="reply-user-name">
                    <span>{{ thisUser.userName }}</span>
                </p>
            </div>

            <span>·</span>

            <p class="reply-date">
                {{ dateFormat(thisReply.createdAt) }}

                <span>·</span>

                {{ hourFormat(thisReply.createdAt) }}
            </p>
        </div>

        <div class="reply-outer-container">
            <div class="reply-inner-container">
                <p class="reply-text">
                    {{ thisReply.replyText }}
                </p>

                <div class="reply-reply-container" v-if="thisReply.replyTarget.target === 'article'">
                    <slot></slot>
                </div>

                <div class="reply-controls">
                    <button type="button" class="button-reply-controls" v-if="thisReply.replyTarget.target === 'article'" @click="replyHandler">
                        <svg class="remix">
                            <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ currentTargetIndicator ? 'close-line' : 'chat-3-line' }`"></use>
                        </svg>

                        <span>{{ currentTargetIndicator ? '취소' : '대댓글 작성' }}</span>
                    </button>

                    <span v-if="thisReply.replyTarget.target === 'article'">·</span>

                    <button type="button" class="button-reply-controls" @click="console.log('지금 삭제하려는 댓글 :', thisReply._id)">
                        <svg class="remix">
                            <use xlink:href="/miscs/remixicon.symbol.svg#ri-close-circle-fill"></use>
                        </svg>

                        <span>삭제</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { getArticleReplies, getUserInfo } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';
    import hourFormat from '../utilities/hourFormat';

    const props = defineProps([ 'replyId' ]);
    const emits = defineEmits([ 'sendReplyInfo' ]); // 대댓글 작성을 위해 이 댓글의 정보를 돌려보내는 emit
    const thisReply = await getArticleReplies(props.replyId);
    const thisUser = thisReply.userID ? await getUserInfo(thisReply.userID) : { userName: thisReply.userName };
    const currentTargetIndicator = ref(false);

    const replyHandler = () => {
        emits('sendReplyInfo', currentTargetIndicator.value ? false : thisReply);

        currentTargetIndicator.value = !currentTargetIndicator.value;
    }
</script> <!-- Logic Ends -->