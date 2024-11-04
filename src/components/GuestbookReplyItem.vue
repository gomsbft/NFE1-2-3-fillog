<template>
    <li class="guestbook-reply-item">
        <div class="guestbook-reply-info">
            <UserNameTag :user-id="replyObject?.replyUserID" />

            <span>·</span>

            <p class="guestbook-reply-date">
                {{ dateFormat(replyObject?.createdAt) }}

                <span>·</span>

                {{ hourFormat(replyObject?.createdAt) }}
            </p>
        </div>

        <p class="guestbook-reply-text">{{ replyObject?.replyText ?? '(내용 없음)' }}</p>

        <button type="button" class="button-guestbook-controls" title="방명록 답글 삭제">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-close-circle-fill"></use>
            </svg>

            <span>답글 삭제</span>
        </button>
    </li>
</template> <!-- Template Ends -->

<script setup>
    import dateFormat from '../utilities/dateFormat';
    import hourFormat from '../utilities/hourFormat';

    const props = defineProps([ 'replyObject' ]);
</script> <!-- Logic Ends -->