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

                <div class="reply-controls" v-if="thisReply.replyTarget.target === 'article'">
                    <button @click="console.log(thisReply._id)">댓글 ID 확인 (임시 - 해당 ID를 기준으로 대댓글 작성)</button>
                </div>
            </div>
        </div>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { getArticleReplies, getUserInfo } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';
    import hourFormat from '../utilities/hourFormat';

    const props = defineProps([ 'replyId' ]);
    const thisReply = await getArticleReplies(props.replyId);
    const thisUser = await getUserInfo(thisReply.userID);
</script> <!-- Logic Ends -->