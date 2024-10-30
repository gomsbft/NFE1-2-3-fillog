<template>
    <li class="guestbook-reply-item">
        <div>
            <UserNameTag :user-id="replyObject.replyUserID" />
        </div>

        <div>
            <p>{{ replyObject.replyText }}</p>
        </div>
    </li>
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'replyObject' ]);
</script> <!-- Logic Ends -->