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
                        <img class="article-item-thumbnail" v-if="article.images.length > 0" :src="article.images" alt="이미지 미리보기">
                        <img v-else class="remix" src="../assets/images/file-image-line.svg">
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
    })

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

</style> <!-- Stylesheet Ends -->