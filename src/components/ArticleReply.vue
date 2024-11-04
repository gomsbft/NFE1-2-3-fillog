<template>
    <div class="reply-item">
        <div class="reply-info-container">
            <UserNameTag v-if="thisReply.userID" :user-id="thisReply.userID" />

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
            </p>
        </div>

        <div class="reply-outer-container">
            <div class="reply-inner-container">
                <p class="reply-text">
                    {{ thisReply.commentText }}
                </p>

                <div class="reply-reply-container">
                    <slot></slot>
                </div>

                <div class="reply-controls">
                    <button @click="console.log(thisReply._id)">댓글 ID 확인 (임시 - 해당 ID를 기준으로 대댓글 작성)</button>
                </div>
            </div>
        </div>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { getArticleReplies, getUserInfo } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';

    const props = defineProps([ 'postId','replyId' ]);
    const thisReply = await getArticleReplies(props.postId);
    const thisUser = await getUserInfo(thisReply.userID);
    thisReply.forEach(async (reply) => {
  const userInfo = await getUserInfo(reply.userId);
  console.log('User Info:', userInfo); // 유저 정보가 제대로 출력되는지 확인
});
</script> <!-- Logic Ends -->