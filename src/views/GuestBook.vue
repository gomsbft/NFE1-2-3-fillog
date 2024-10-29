<template>
    <div id="guestBook">
        <h1 class="page-title">방명록</h1>

        <PageFilter id="guestFilter" label-icon="corner-down-right-line" label-text="답글 여부" :filter-array="guestFilterArray" :origin-value="'all'" />

        <div>
            방명록 작성기 들어갈 자리

            <textarea name="" id="" placeholder="방명록"></textarea>
        </div>

        <ul id="guestItemList">
            <GuestbookItem :guest-id="1" />
        </ul> <!-- #guestItemList -->

        <EmptyList />
    </div> <!-- #guestBook -->
</template> <!-- Template Ends -->

<script setup>
    import GuestbookItem from '../components/GuestbookItem.vue';

    const guestFilterArray = [ // 임시 필터 리스트 데이터
        { name: '전체', value: 'all' },
        { name: '답글 있음', value: 'reply-exist' },
        { name: '답글 없음', value: 'no-reply' }
    ]
</script> <!-- Logic Ends -->