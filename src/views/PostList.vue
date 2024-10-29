<template>
    <div id="postList">
        <h1 class="page-title">포스트</h1>

        <div id="postFilter" class="page-filter-container">
            <label for="lstCategory" class="page-filter-type-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-equalizer-line"></use>
                </svg>

                <span>검색 조건</span>
            </label>

            <select name="list-category" id="lstCategory" v-model="selectedCategory">
                <option value="all">전체</option>
                <option v-for="(category, value) in movieCategory" :key="value" :value="value">{{ category }}</option>
            </select>


            <div id="totalSearchContainer">
                <input type="text" name="search-keyword" id="txtTotalSearch" v-model="searchKeyword" placeholder="검색 키워드 입력...">

                <ButtonWithIcon element-id="btnTotalSearch" icon-position="only" icon-name="search-2-line" @click="searchPost">
                    검색
                </ButtonWithIcon>
            </div> <!-- #totalSearchContainer -->
        </div> <!-- #postFilter -->

        <ul id="postItemList" v-if="filterPost.length > 0">
            <li class="article-item" v-for="article in filterPost" :key="article._id">
                <div class="article-item-image-container">
                    <RouterLink :to="`/posts/${ article._id }`">
                        <img class="article-item-thumbnail" v-if="article.images.length > 0" :src="article.images[0]" alt="이미지 미리보기">
                        <svg v-else class="remix" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 7L16 2H3.9934C3.44495 2 3 2.44405 3 2.9918V21.0082C3 21.5447 3.44476 22 3.9934 22H20.0066C20.5551 22 21 21.556 21 21.0082V7ZM11 9.5C11 10.3284 10.3284 11 9.5 11C8.67157 11 8 10.3284 8 9.5C8 8.67157 8.67157 8 9.5 8C10.3284 8 11 8.67157 11 9.5ZM17.5 17H8L13.5 10L17.5 17Z"></path>
                        </svg>
                    </RouterLink>

                </div>

                <dl class="article-item-descriptions">
                    <dt class="article-item-titlebar" :title="article.title">
                        <p class="article-item-title">
                            <RouterLink :to="`/posts/${ article._id }`">
                                {{ article.title }}
                            </RouterLink>
                        </p>

                        <!-- <span v-if="article.comments.length > 0">
                            [{{ article.comments.length }}]
                        </span>
                        <span v-else>0</span> -->
                    </dt>

                    <dd class="article-item-info">
                        <RouterLink :to="`/posts/${ article._id }`">
                            {{ movieCategory[article.category] }}
                        </RouterLink>

                        <span>·</span>

                        <RouterLink :to="`/posts/${ article._id }`">
                            {{ new Date(article.createdAt).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                        </RouterLink>
                    </dd>

                    <dd class="article-item-text-summary">
                        <RouterLink :to="`/posts/${ article._id }`">
                            {{ article.content.replace(/<[^>]*>?/g, ' ') }}
                        </RouterLink>
                    </dd>
                </dl>
            </li>
        </ul> <!-- #postItemList -->

        <EmptyList v-else />
    </div> <!-- #postList -->
</template> <!-- Template Ends -->

<script setup>
    import movieCategory from '../datas/movieCategory.json';
    import {ref, onMounted, computed} from 'vue';
    import axios from 'axios';

    const postData = ref([]);
    const searchKeyword = ref('');
    const selectedCategory = ref('all');

    const postDatas = async() => {
        try {
            const response = await axios.get('http://localhost:3000/posts');

            postData.value = response.data;
        } catch (err) {
            console.error(err);
        }
    };

    onMounted(() => {
        postDatas();
    });


    const filterPost = computed(() => {
        return postData.value.filter(article => {
            const matchKeyword = article.title.includes(searchKeyword.value) || article.content.includes(searchKeyword.value);
            const matchCategory = selectedCategory.value === "all" || article.category === selectedCategory.value;

            return matchKeyword && matchCategory;
        })
    })

    const searchPost = () => {
        console.log(searchKeyword.value);
    }
</script> <!-- Logic Ends -->

<style lang="scss" scoped>
    .article-item-image-container {
        svg {
            width: 100%;
            height: 100%;
        }
    }
</style> <!-- Stylesheet Ends -->