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
                {{ dateFormat(reply.createdAt) }}
            </p>
            <button>X</button>
        </div>

        <div class="reply-outer-container">
            <div class="reply-inner-container">
                <p class="reply-text">
                    {{ reply.replyText }}
                </p>

                <div class="reply-reply-container">
                    <slot></slot>
                </div>

                <div class="reply-controls">
                    <button @click="console.log(reply._id)">댓글 ID 확인 (임시 - 해당 ID를 기준으로 대댓글 작성)</button>
                </div>
            </div>
        </div>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { getArticleReplies, getArticleRepliesAll } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';
    import { ref, onMounted, computed } from 'vue';
    import { useUserStore } from '../stores/userInfo';
    const userStore = useUserStore();

    userStore.state.userName
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
        } catch (error) {
            console.error("Error fetching replies:", error);
        }
    };

    onMounted(() => {
    fetchReplies(props.postId); 
    });
</script> <!-- Logic Ends -->