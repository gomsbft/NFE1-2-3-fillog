<template>
    <aside id="sideBarMain">
        <div id="sideBlogInfoContainer">
            <div class="blog-owner-image-container">
                
                <img :src="`http://localhost:3000/${blogOwner.adminImage}`" alt="블로그 관리자 프로파일 이미지">

                <button type="button" id="btnShowInfo" title="블로그 소개">
                    <span>블로그 소개</span>
                </button>
            </div>

            <div class="blog-info-container sidebar-hidden">
                <h6 class="blog-info-blog-name">{{ blogOwner.blogName }}</h6>


                <p>{{ blogOwner.adminName }}</p>


                <div class="blog-info-tag-container">
                    <p class="blog-info-tags" v-for="tag in blogOwner.tags">{{ tag }}</p>
                </div>
            </div>
        </div> <!-- #sideBlogInfoContainer -->

        <div id="sideBlogControls">
            <button type="button" class="buttons-blog-control">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-search-fill"></use>
                </svg>

                <span>글쓴이 정보</span>
            </button>

            <button 
                type="button" 
                class="buttons-blog-control"
                v-if="didIFollowed && !isAdmin"
                @click="followFn">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-add-fill"></use>
                </svg>

                <span>팔로우</span>
            </button>

            <button 
            type="button" 
            class="buttons-blog-control" v-else-if="didIFollowed === false && !isAdmin"
            @click="followFn">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-dislike-fill"></use>
                </svg>

                <span>언팔로우</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="isAdmin === false">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-information-2-fill"></use>
                </svg>

                <span>블로그 정보</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="isAdmin === true && log.logins === true" @click="$router.push('/posts/write')">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-quill-pen-fill"></use>
                </svg>

                <span>글쓰기</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="isAdmin === true">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-settings-4-fill"></use>
                </svg>

                <span>블로그 관리</span>
            </button>
        </div> <!-- #sideBlogControls -->


        <div id="sideCategory" class="rounded sidebar-hidden">
            <h6 class="sidebar-section-title">포스트 카테고리</h6>

            <ul class="sidebar-category-container">
                <li v-for="(menuItem, index) in movieCategory" :key="index">
                    {{ menuItem }} [{{ postData.filter(post => post.category === index).length }}]
                </li>
            </ul>
        </div>

        <div id="sideLatest" class="rounded sidebar-hidden">
            <h6 class="sidebar-section-title">최근 게시물</h6>

            <ul class="sidebar-category-container">
                <li></li>
            </ul>
        </div>
    </aside> <!-- #sideBarMain -->
</template> <!-- Template Ends -->

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import axios from 'axios';
    import movieCategory from '../datas/movieCategory.json';
    import { userLogin } from '../stores/isLogin';

    const didIFollowed = ref(true); // 임시 팔로우 정보
    const postData = ref([]);
    const log = userLogin();

    // 관리자(admin)의 이미지와 이름을 저장하는 ref
    const blogOwner = ref({
        adminImage: null,
        adminName: "블로그 관리자", // user가 볼 수 있는 admin의 이름
        blogName: "블로그 이름",
        tags: [],
    });

    const thisUser = ref({
        userId: null,
        userImage: "",
        userName: "사용자명"
    });

    const isAdmin = ref(false); // 사용자 권한 체크


    const postDatas = async () => {
        try {
            const response = await axios.get('http://localhost:3000/posts');

            postData.value = response.data;
        } catch (err) {
            console.error(err);
        }
    };


    watch(log, (newValue) => {
        if (newValue.logins) {
        getUserProfile(); // 로그인 시 사용자 프로필 다시 가져오기
        }
    });



    // 서버에서 사용자 정보 가져옴
    const getUserProfile = async () => {
        try {
            const token = localStorage.getItem("token"); // 저장된 토큰 가져오기
            if (!token) {
                throw new Error("사용자 토큰이 없습니다."); // 토큰이 없으면 오류 발생
            }

            const response = await axios.get("http://localhost:3000/profile", {
                headers: {
                    Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                },
            });

            const userData = response.data;
            thisUser.value.userId = userData._id; // 현재 로그인한 사용자의 ID
            thisUser.value.userImage = userData.userImage; // 사용자 이미지
            thisUser.value.userName = userData.userName; // 사용자 이름

            // type이 "admin"인지 확인
            isAdmin.value = userData.type === "admin";

            
        } catch (error) {
            console.error("사용자 정보 가져오기 실패:", error);
        }
    };
    
    

    const fetchAdminInfo = async () => {
    try {
        // 서버에서 관리자 정보를 가져옵니다.
        const response = await axios.get("http://localhost:3000/admin-info");

        // 응답에서 관리자 정보 데이터를 구조 분해 할당을 통해 추출합니다.
        const { adminImage, userName, blogName, tags } = response.data;

        // 가져온 데이터를 blogOwner의 속성에 각각 할당합니다.
        blogOwner.value.adminImage = adminImage;
        blogOwner.value.adminName = userName;
        blogOwner.value.blogName = blogName;
        blogOwner.value.tags = tags;

    } catch (error) {
        console.error("관리자 정보 가져오기 실패(클라이언트):", error);
    }
};

console.log("내가 오너", blogOwner)

    onMounted(() => {
        postDatas();
        getUserProfile();
        fetchAdminInfo(); 
    });
    
    // 팔로우 기능
    const followFn = async() => {

        const url = didIFollowed.value 
            ? `http://localhost:3000/users/${blogOwner.adminId}/follow` 
            : `http://localhost:3000/users/${blogOwner.adminId}/unfollow`;


        try {
            await axios.post(url, { followerId: thisUser.value });
            didIFollowed.value = !didIFollowed.value;
            console.log(!didIFollowed.value ? "팔로우 성공" : "언팔 성공")
        } catch (err) {
            console.error(err);
        }
    }
</script> <!-- Logic Ends -->