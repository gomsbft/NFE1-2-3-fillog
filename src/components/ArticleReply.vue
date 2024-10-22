<template>
    <div class="reply-item">
        <div class="reply-info-container">
            <UserNameTag :user-id="props.replyObject.userId" />

            <span>·</span>

            <p class="reply-date">
                {{ new Date(props.replyObject.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
            </p>
        </div>

        <div class="reply-outer-container">
            <div class="reply-inner-container">
                <p class="reply-text">
                    {{ props.replyObject.commentText }}
                </p>

                <div class="reply-controls">
                    <button @click="console.log(props.replyObject.id)">댓글 ID 확인 (임시)</button>
                </div>
            </div>
        </div>
    </div>
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'replyObject' ]);
</script> <!-- Logic Ends -->

<style lang="scss" scoped>

</style> <!-- Stylesheet Ends -->