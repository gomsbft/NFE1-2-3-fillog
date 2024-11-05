<template>
    <div  v-for="reply in replies" :key="reply._id" class="reply-item">
        <div class="reply-info-container">
            <UserNameTag v-if="reply.userID" :userId="reply.userID" />
            <div class="reply-user-tag" v-else>
                <div class="reply-user-image">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
                    </svg>
                </div>

                <p class="reply-user-name">
                    <span>{{ reply?.userName || '익명'}}</span>
                </p>
            </div>

            <span>·</span>

            <p class="reply-date">
                {{ dateFormat(thisReply.createdAt) }}

                <span>·</span>

                {{ hourFormat(thisReply.createdAt) }}
            </p>
            <button v-if="commentDeleteHandler">X</button>
        </div>

        <div class="reply-outer-container">
            <div class="reply-inner-container">
                <p class="reply-text">
                    {{ reply.replyText }}
                </p>

                <div class="reply-reply-container" v-if="thisReply.replyTarget.target === 'article'">
                    <slot></slot>
                </div>

                <div class="reply-controls">
                    <button type="button" class="button-reply-controls" v-if="thisReply.replyTarget.target === 'article'" @click="console.log('지금 클릭한 댓글 :',thisReply._id)">
                        <svg class="remix">
                            <use xlink:href="/miscs/remixicon.symbol.svg#ri-chat-3-line"></use>
                        </svg>

                        <span>대댓글 작성</span>
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
    import { ref, onMounted, computed } from 'vue';
    import { getArticleReplies, getArticleRepliesAll } from '../utilities/dataQueries';
    import { useUserStore } from '../stores/userInfo';
    import dateFormat from '../utilities/dateFormat';
    import hourFormat from '../utilities/hourFormat';

    const userStore = useUserStore();
    const props = defineProps({
        postId: {
            type: String,
            required: true,
        },
        replyId: {
            type: String,
            required: true,
        },
    });

    const replies = ref([]);
    const repliesCount = computed(()=> replies.value.length)

    const fetchReplies = async (postId) => {
        try {
            const commentIds = await getArticleRepliesAll(postId); 
            
            const repliesData = await Promise.all(commentIds.map(async (replyId) => {
                return await getArticleReplies(replyId); 
            }));

            replies.value = repliesData; 
            console.log("repliesData", repliesData)
            console.log("replies", replies)
        } catch(error) {
            console.error("Error fetching replies:", error);
        }
    };

    onMounted(() => {
        fetchReplies(props.postId); 
    });
</script> <!-- Logic Ends -->