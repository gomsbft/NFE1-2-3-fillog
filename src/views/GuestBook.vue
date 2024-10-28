<template>
    <div id="guestBook">
        <h1 class="page-title">방명록</h1>

        <div id="guestFilter" class="page-filter-container">
            <label class="page-filter-type-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-corner-down-right-line"></use>
                </svg>

                <span>답글 여부</span>
            </label>

            <div class="page-filter-wrapper">
                <button type="button" class="button-filter-selector active">
                    전체
                </button>

                <button type="button" class="button-filter-selector">
                    답글 있음
                </button>

                <button type="button" class="button-filter-selector">
                    답글 없음
                </button>
            </div>
        </div>

        <PageFilter label-icon="corner-down-right-line" label-text="답글 여부" :filter-array="guestFilterArray" :origin-value="'all'" />

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
    import PageFilter from '../components/commons/PageFilter.vue';
    import GuestbookItem from '../components/GuestbookItem.vue';

    const guestFilterArray = [
        { name: '전체', value: 'all' },
        { name: '답글 있음', value: 'reply-exist' },
        { name: '답글 없음', value: 'no-reply' }
    ]
</script> <!-- Logic Ends -->