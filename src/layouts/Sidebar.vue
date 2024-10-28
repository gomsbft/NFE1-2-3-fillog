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

            <RouterLink to="/write" class="buttons-blog-control">
                <button type="button" class="buttons-blog-control" v-if="blogInfo.adminId === thisUser">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-quill-pen-fill"></use>
                    </svg>
                    <span>글쓰기</span>
                </button>
            </RouterLink>

            <button type="button" class="buttons-blog-control" v-if="blogInfo.adminId === thisUser">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-settings-4-fill"></use>
                </svg>

                <span>블로그 관리</span>
            </button>
        </div> <!-- #sideBlogControls -->

        <div id="sideCategory" class="rounded">
            <h6 class="sidebar-section-title">포스트 카테고리</h6>

            <ul>
                <li v-for="(menuItem, index) in movieCategory" :key="index">
                    {{ menuItem }} [{{ postData.filter(post => post.category === index).length }}]
                </li>
            </ul>
        </div> <!-- #sideCategory -->

        <div class="rounded">
            <h6 class="sidebar-section-title">최근 게시물</h6>

            <ul>
                <li></li>
            </ul>
        </div>
    </aside> <!-- #sideBarMain -->
</template> <!-- Template Ends -->

<script setup>
    import { ref, onMounted } from 'vue';
    import axios from 'axios';
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
    })

    const blogOwner = userData.find(user => user.id === parseInt(blogInfo.adminId) && user.type === 'admin');

    const didIFollowed = ref(true); // 임시 팔로우 정보
    const thisUser = ref(123125); // 임시 로그인 유저 정보
</script> <!-- Logic Ends -->