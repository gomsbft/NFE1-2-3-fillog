<template>
    <div id="myPage">
        <h1 class="page-title">마이페이지</h1>

        <div class="section-title-bar">
            내 프로필
        </div>

        <div class="infoContent imgContainer">
            <img :src="userInfo.userImage" alt="Uploaded User Image" />
        </div>

        <div class="infoList">
            <p class="infoContent">{{ userInfo?.userName }}</p>
            <p class="infoContent">{{ userInfo?.account }}</p>

            <button id="editBtn" @click="openModal">프로필 관리</button>
        </div>

        <!-- 모달 부분, 프로필 관리 버튼 클릭시 표시 -->
        <div class="modal-wrap" v-show="modalState">
            <div class="modal-container">
                <div class="modal-header">
                    <span>정보 수정</span>
                    <span class="close-button" @click="closeModal">&times;</span>
                </div>

                <form class="editInfoList">
                    <div class="imgContainer">
                        <p class="imgText">프로필 이미지</p>
                        <label for="userImage" class="imgLabel">이미지 선택</label>
                        <input @change="imgUplod" type="file" id="userImage" accept="image/jpeg, image/png, image/webp" class="imgInput">
                        <img v-if="previewImageUrl" :src="previewImageUrl || ''" alt="Profile Image Preview" class="imgView" />
                    </div>

                    <label>닉네임:</label>
                    <input class="editContent" v-model="editUserInfo.userName" />

                    <label>이메일:</label>
                    <input class="editContent" v-model="editUserInfo.account" />
                </form>

                <div class="modal-btn">
                    <button @click="saveEditContent">확인</button>
                </div>
            </div>
        </div>

        <hr>

        <div class="section-title-bar">
            관심있는 포스트
        </div>

        <PageFilter id="postFilter" label-icon="corner-down-right-line" label-text="포스트" :filter-array="postFilterArray" :origin-value="'all'" />

        <EmptyList />
    </div> <!-- #myPage -->
</template> <!-- Template Ends -->

<script setup>
    import { onMounted, reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';

    const router = useRouter();
    const postFilterArray = [ // 임시 필터 리스트 데이터
            { name: '전체', value: 'all' },
            { name: '좋아요한', value: 'likedArticles' },
            { name: '댓글을 작성한', value: 'commentedArticles' }
        ]

    let userInfo = reactive({
        userImage: null,
        account: '',
        userName: '',
        commentedArticles: ''
    });

    let editUserInfo = reactive({
        userName: '',
        account: '',
        userImage: null,
    });

    let modalState = ref(false);
    const previewImageUrl = ref(null);

    // 토큰에서 로그인한 유저 이메일 추출하기
    const findUserAccount = () => {
        const token = window.localStorage.getItem("token");
        // 토큰에서 payload 부분만 추출
        const base64Payload = token.split('.')[1];
        // base64 디코딩하여 JSON 객체로 변환
        const userAccount = JSON.parse(atob(base64Payload)).account;
        // tokenPayload.value = userAccount.account;
        console.log('userAccount :',userAccount);
        findUserInfo(userAccount);
    }

    // 추출한 이메일을 기반으로 DB에서 유저 정보 가져오기
    const findUserInfo = async (userAccount) => {
        try{
            const postResponse = await axios.post(`http://localhost:3000/mypage`, { userAccount });

            console.log('응답 데이터:',postResponse.data);
            Object.assign(userInfo, postResponse.data);
            console.log('userInfo: ', userInfo)
        } catch(err) {
            console.error(err);
        }
    }

    onMounted(()=>{
        findUserAccount();
    });

    // 프로필 관리 버튼 : 클릭시 정보 수정 모달창 열림
    const openModal = () =>{
        Object.assign(editUserInfo, {
            userName: userInfo.userName,
            account: userInfo.account,
            userImage: userInfo.userImage,
        });

        modalState.value = true;
    }

    // 이미지 업로드 핸들러
    const imgUplod = (event) => {
        const file = event.target.files[0];

        editUserInfo.userImage = file;

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImageUrl.value = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    }

    // 모달창 - 닫기 버튼
    const closeModal = () => {
        modalState.value = false;
    }

    // 모달창 - 저장 버튼
    const saveEditContent = () => {
        modalState.value = false;
        console.log('Updated info:', editUserInfo);
        changeUserInfo(editUserInfo)
    }

    // 입력한 값으로 DB 정보 수정하기
    const changeUserInfo = async ({ userName, account, userImage }) => {
        try {
            const response = await axios.post(`http://localhost:3000/mypage/edit`, {
                _id: userInfo._id,
                userName,
                account,
                userImage,
            });

            Object.assign(userInfo, response.data);
            console.log('응답 데이터: ', response);
        } catch(err) {
            console.error(err);
        }
    }
</script> <!-- Logic Ends -->