<template>
    <li class="guestbook-item">
        <div class="guestbook-user-container">
            <div>
                <img src="" alt="">
            </div>

            <div>
                <p class="guest-user-name">작성자명</p>

                <p class="guest-written-date">작성일</p>
            </div>
        </div>

        <div class="guestbook-content">내용</div>

        <div class="guestbook-control">
            삭제
        </div>

        <div class="guestbook-reply-container">
            <slot></slot>
        </div>
    </li>
</template> <!-- Template Ends -->

<script setup>
    import { getGuestbookInfo } from '../utilities/dataQueries';

    const props = defineProps([ 'guestId' ]);

    console.log(props.guestId);
</script> <!-- Logic Ends -->