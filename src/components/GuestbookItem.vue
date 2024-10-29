<template>
    <li class="guestbook-item">
        <div>
            <p class="guest-user-name">작성자명</p>

            <span>·</span>

            <p class="guest-written-date">작성일</p>
        </div>

        <div>내용</div>

        <div>
            삭제
        </div>

        <div>
            <slot></slot>
        </div>
    </li>
</template> <!-- Template Ends -->

<script setup>
    import { getGuestbookInfo } from '../utilities/dataQueries';

    const props = defineProps([ 'guestId' ]);

    console.log(props.guestId);
</script> <!-- Logic Ends -->