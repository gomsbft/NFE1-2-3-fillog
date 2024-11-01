<template>
    <aside id="sideBarMain">
        <div id="sideBlogInfoContainer">
            <div class="blog-owner-image-container">
                <img v-if="blogAdmin?.adminImage" :src="`http://localhost:3000/${ blogAdmin.adminImage }`" alt="블로그 관리자 프로파일 이미지">

                <svg class="remix" v-else>
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
                </svg>

                <button type="button" id="btnShowInfo" title="블로그 소개">
                    <span>블로그 소개</span>
                </button>
            </div>

            <div class="blog-info-container sidebar-hidden">
                <h6 class="blog-info-blog-name">{{ blogAdmin.blogInfo.blogName }}</h6>

                <p>{{ blogAdmin.adminName }}</p>

                <div class="blog-info-tag-container" v-if="blogAdmin.blogInfo.favoriteGenres?.length > 0">
                    <p class="blog-info-tags" v-for="genre in blogAdmin.blogInfo.favoriteGenres">{{ genreList.find(item => item.id === genre).name }}</p>
                </div>
            </div>
        </div> <!-- #sideBlogInfoContainer -->

        <div id="sideBlogControls">
            <button type="button" class="buttons-blog-control" @click="userInfo">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-search-fill"></use>
                </svg>

                <span>글쓴이 정보</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="didIFollowed && !isAdmin" @click="followFn">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-add-fill"></use>
                </svg>

                <span>팔로우</span>
            </button>

            <button type="button" class="buttons-blog-control" v-else-if="didIFollowed === false && !isAdmin" @click="followFn">
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
                <li class="sidebar-category-item" v-for="(menuItem, index) in articleCategory" :key="index">
                    <p>{{ menuItem }}</p> <span>{{ postData.filter(post => post.category === index).length.toLocaleString('ko-KR') }}</span>
                </li>
            </ul>
        </div>

        <div id="sideLatest" class="rounded sidebar-hidden">
            <h6 class="sidebar-section-title">최근 게시물</h6>

            <ul class="sidebar-category-container">
                <li class="sidebar-latest-item" v-for="(article, index) in postData.slice(0, 5)" :key="index">
                    <RouterLink class="latest-item-titlebar" :to="`/posts/${ article._id }`">
                        <p>{{ article.title }}</p>

                        <span>[{{ article.comments.length.toLocaleString('ko-KR') }}]</span>
                    </RouterLink>

                    <span class="latest-item-date">{{ dateFormat(article.createdAt) }}</span>
                </li>
            </ul>
        </div>
    </aside> <!-- #sideBarMain -->
</template> <!-- Template Ends -->

<script setup>
    import { ref, onMounted, watch } from 'vue';
    import { useRouter, RouterLink } from 'vue-router';
    import axios from 'axios';
    import { getAdminInfo, getTotalPosts, movieCategories } from '../utilities/dataQueries';
    import { userLogin } from '../stores/isLogin';
    import dateFormat from '../utilities/dateFormat';
    import articleCategory from '../datas/articleCategory.json';

    const isAdmin = ref(false); // 사용자 권한 체크
    const didIFollowed = ref(true); // 임시 팔로우 정보
    const blogAdmin = ref({ // 블로그 기본값
        adminID: null,
        adminName: '블로그 주인'
    });

    const router = useRouter();
    const thisUser = ref({ // 현재 사용자 기본값
        userId: null,
        userImage: '',
        userName: '사용자명'
    });

    const userInfo = () => {
        router.push('/userinfo');
    }

    const adminFromDB = await getAdminInfo();
    const postData = await getTotalPosts();
    const genreList = await movieCategories();

    if (adminFromDB?.adminID) blogAdmin.value = adminFromDB;

    const log = userLogin();

    watch(log, (newValue) => {
        if (newValue.logins) {
            getUserProfile(); // 로그인 시 사용자 프로필 다시 가져오기
        }
    });

    // 서버에서 사용자 정보 가져옴
    const getUserProfile = async () => {
        try {
            const token = localStorage.getItem('token'); // 저장된 토큰 가져오기

            if (!token) {
                throw new Error('사용자 토큰이 없습니다.'); // 토큰이 없으면 오류 발생
            }

            const response = await axios.get('http://localhost:3000/profile', {
                headers: {
                    Authorization: `Bearer ${ token }`, // 토큰을 Authorization 헤더에 추가
                },
            });

            const userData = response.data;

            thisUser.value.userId = userData._id; // 현재 로그인한 사용자의 ID
            thisUser.value.userImage = userData.userImage; // 사용자 이미지
            thisUser.value.userName = userData.userName; // 사용자 이름

            // type이 "admin"인지 확인
            isAdmin.value = userData.type === 'admin';
        } catch(error) {
            console.error(error);
        }
    };

    onMounted(() => {
        getUserProfile();
    });

    // 팔로우 기능
    const followFn = async() => {
        const url = didIFollowed.value
            ? `http://localhost:3000/users/${ blogOwner.adminId }/follow`
            : `http://localhost:3000/users/${ blogOwner.adminId }/unfollow`;

        try {
            await axios.post(url, { followerId: thisUser.value });
            didIFollowed.value = !didIFollowed.value;
            console.log(!didIFollowed.value ? '팔로우 성공' : '언팔 성공');
        } catch (err) {
            console.error(err);
        }
    }
</script> <!-- Logic Ends -->