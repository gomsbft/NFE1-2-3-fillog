<template>
    <li class="guestbook-reply-item">
        <div class="guestbook-reply-info">
            <UserNameTag :user-id="replyObject.replyUserID" />

            <span>·</span>

            <p class="guestbook-reply-date">
                {{ new Date(replyObject.replyDate).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
            </p>
        </div>

        <p class="guestbook-reply-text">{{ replyObject.replyText }}</p>

        <button type="button" class="button-guestbook-controls" title="방명록 답글 삭제">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-close-circle-fill"></use>
            </svg>

            <span>답글 삭제</span>
        </button>
    </li>
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'replyObject' ]);
</script> <!-- Logic Ends -->