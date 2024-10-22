<template>
    <div id="postList">
        <div id="postFilter">
            <label for="lstCategory">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-equalizer-line"></use>
                </svg>

                <span>카테고리</span>
            </label>

            <select name="list-category" id="lstCategory">
                <option value="all">전체</option>
                <option v-for="(catItem, index) in postCategory" :key="index" :value="index">{{ catItem }}</option>
            </select>

            <div id="totalSearchContainer">
                <input type="text" name="search-keyword" id="txtTotalSearch" v-model="searchKeyword" placeholder="검색 키워드 입력...">

                <ButtonWithIcon element-id="btnTotalSearch" icon-position="only" icon-name="search-2-line" @click="console.log(searchKeyword)">
                    검색
                </ButtonWithIcon>
            </div> <!-- #totalSearchContainer -->
        </div> <!-- #postFilter -->

        <ul id="postItemList" v-if="postData">
            <li class="article-item" v-for="article in postData" :key="article.id">
                <div class="article-item-image-container">
                    <RouterLink :to="`/posts/${ article.id }`">
                        <img class="article-item-thumbnail" v-if="article.thumbIndex" :src="article.images.find(item => item.index === article.thumbIndex)?.imageURL" alt="이미지 미리보기">
                    </RouterLink>

                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-gallery-line"></use>
                    </svg>
                </div>

                <dl class="article-item-descriptions">
                    <dt class="article-item-titlebar" :title="article.title">
                        <p class="article-item-title">
                            <RouterLink :to="`/posts/${ article.id }`">
                                {{ article.title }}
                            </RouterLink>
                        </p>

                        <span>[{{ article.comments.length }}]</span>
                    </dt>

                    <dd class="article-item-info">
                        <RouterLink :to="`/posts/${ article.id }`">
                            {{ postCategory[article.category] }}
                        </RouterLink>

                        <span>·</span>

                        <RouterLink :to="`/posts/${ article.id }`">
                            {{ new Date(article.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                        </RouterLink>
                    </dd>

                    <dd class="article-item-text-summary">
                        <RouterLink :to="`/posts/${ article.id }`">
                            {{ article.text.replace(/<[^>]*>?/g, ' ') }}
                        </RouterLink>
                    </dd>
                </dl>
            </li>
        </ul> <!-- #postItemList -->

        <div v-else>
            게시물이 없습니다.
        </div>
    </div> <!-- #postList -->
</template> <!-- Template Ends -->

<script setup>
    import postData from '../datas/postData.json'; // 임시 데이터
    import postCategory from '../datas/articleCategory.json'; // 임시 카테고리

    const searchKeyword = defineModel({ default: '' }); // 검색 키워드 v-model

    postData.sort((a, b) => new Date(b.date) - new Date(a.date));
</script> <!-- Logic Ends -->

<style lang="scss" scoped>

</style> <!-- Stylesheet Ends -->