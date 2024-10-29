<template>
    <aside id="sideBarMain">
        <div id="sideBlogInfoContainer">
            <div class="blog-owner-image-container">
                <img :src="blogOwner.userImage" alt="블로그 관리자 프로파일 이미지">

                <button type="button" id="btnShowInfo" title="블로그 소개">
                    <span>블로그 소개</span>
                </button>
            </div>

            <div class="blog-info-container sidebar-hidden">
                <h6 class="blog-info-blog-name">{{ blogInfo.blogName }}</h6>
                <p class="blog-info-blog-owner">{{ blogOwner.userName }}</p>

                <div class="blog-info-tag-container">
                    <p class="blog-info-tags" v-for="tag in blogInfo.tags">{{ tag }}</p>
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

            <button type="button" class="buttons-blog-control" v-if="didIFollowed && blogInfo.adminId !== thisUser" @click="didIFollowed = !didIFollowed">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-add-fill"></use>
                </svg>

                <span>팔로우</span>
            </button>

            <button type="button" class="buttons-blog-control" v-else-if="didIFollowed === false && blogInfo.adminId !== thisUser" @click="didIFollowed = !didIFollowed">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-dislike-fill"></use>
                </svg>

                <span>언팔로우</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="blogInfo.adminId !== thisUser">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-information-2-fill"></use>
                </svg>

                <span>블로그 정보</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="blogInfo.adminId === thisUser" @click="$router.push('/posts/write')">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-quill-pen-fill"></use>
                </svg>

                <span>글쓰기</span>
            </button>

            <button type="button" class="buttons-blog-control" v-if="blogInfo.adminId === thisUser">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-settings-4-fill"></use>
                </svg>

                <span>블로그 관리</span>
            </button>
        </div> <!-- #sideBlogControls -->

        <div id="sideCategory" class="rounded sidebar-hidden">
            <h6 class="sidebar-section-title">포스트 카테고리</h6>

            <ul>
                <li v-for="(menuItem, index) in movieCategory" :key="index">
                    {{ menuItem }} [{{ postData.filter(post => post.category === index).length }}]
                </li>
            </ul>
        </div>

        <div id="sideLatest" class="rounded sidebar-hidden">
            <h6 class="sidebar-section-title">최근 게시물</h6>

            <ul>
                <li>ㅏㅓ</li>
            </ul>
        </div>

        <div class="rounded">
            <p>Since {{ blogBirthday.toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}</p>
        </div>
    </aside> <!-- #sideBarMain -->
</template> <!-- Template Ends -->

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
    import { userLogin } from '../stores/isLogin';
    import blogInfo from '../datas/blogInfo.json';
    import userData from '../datas/userData.json';
    import movieCategory from '../datas/movieCategory.json';

    const postData = ref([]);

    const postDatas = async() => {
        try {
            const response = await axios.get('http://localhost:3000/posts');
            postData.value = response.data;
            console.log(postData)
        } catch (err) {
            console.error(err);
        }
    };

    onMounted(() => {
        postDatas();
    });

    const blogOwner = userData.find(user => user.id === parseInt(blogInfo.adminId) && user.type === 'admin');
    const blogBirthday = new Date(blogInfo.createdDate);

    const loggedUser = userLogin(); // 로그인 유저 store
    const didIFollowed = ref(true); // 임시 팔로우 정보
    const thisUser = ref(123125); // 임시 로그인 유저 ID (현재 블로그 주인의 ID는 123125로 설정되어 있음)
</script> <!-- Logic Ends -->