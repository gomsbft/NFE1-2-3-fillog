<template>
    <div id="guestBook">
        <h1 class="page-title">방명록</h1>

        <PageFilter id="guestFilter" label-icon="corner-down-right-line" label-text="답글 여부" :filter-array="guestFilterArray" :origin-value="'all'" @current-filter="getCurrentFilter" />

        <div id="guestbookEditor">
            <div v-if="tempUserID !== null" id="guestbookUser">
                <UserNameTag :user-id="tempUserID" />
            </div> <!-- #guestbookUser - 사용자가 로그인 된 상태일 때 -->

            <div v-else id="guestbookUser">
                <div class="guestbook-unknown-user">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
                    </svg>
                </div>

                <input type="text" name="guest-name" id="txtGuestName" minlength="2" maxlength="12" placeholder="별명">
                <input type="password" name="guest-password" id="txtGuestPassword" minlength="8" maxlength="16" placeholder="비밀번호">
            </div> <!-- #guestbookUser - 사용자가 로그인하지 않았을 때 -->

            <div id="guestbookInput">
                <textarea name="guestbook-input" id="txtGuestbook" placeholder="방명록 글 입력..."></textarea>

                <button type="button" id="btnSubmitGuestbook" title="방명록 글 등록">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-corner-down-left-line"></use>
                    </svg>

                    <span>등록</span>
                </button>
            </div>
        </div> <!-- #guestbookEditor -->

        <ul v-if="guestData.length > 0" id="guestItemList">
            <GuestbookItem v-for="guestItem in guestData" :key="guestItem.id" :guest-object="guestItem">
                <GuestbookReplyItem v-for="replyItem in guestItem.replies" :key="replyItem.id" :reply-object="replyItem" />
            </GuestbookItem>
        </ul> <!-- #guestItemList -->

        <EmptyList v-else />
    </div> <!-- #guestBook -->
</template> <!-- Template Ends -->

<script setup>
    import GuestbookItem from '../components/GuestbookItem.vue';
    import GuestbookReplyItem from '../components/GuestbookReplyItem.vue';
    import guestData from '../datas/guestData.json';

    const guestFilterArray = [ // 임시 필터 리스트 데이터
        { name: '전체', value: 'all' },
        { name: '답글 있음', value: 'reply-exist' },
        { name: '답글 없음', value: 'no-reply' }
    ]

    const tempUserID = null; // 임시 사용자 ID - 이후에는 로그인 사용자 스토어에서 가지고 와야 함

    const getCurrentFilter = (data) => {
        console.log('현재 선택한 필터 :', data);
    }
</script> <!-- Logic Ends -->