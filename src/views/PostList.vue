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

            <div class="page-filter-wrapper">
                <select name="list-category" id="lstCategory">
                    <option value="all">전체</option>
                    <option v-for="(catItem, index) in postCategory" :key="index" :value="index">{{ catItem }}</option>
                </select> <!-- #lstCategory -->

                <div id="totalSearchContainer">
                    <input type="text" name="search-keyword" id="txtTotalSearch" v-model="searchKeyword" placeholder="검색 키워드 입력...">

                    <ButtonWithIcon element-id="btnTotalSearch" icon-position="only" icon-name="search-2-line" @click="console.log(searchKeyword)">
                        검색
                    </ButtonWithIcon>
                </div> <!-- #totalSearchContainer -->
            </div>
        </div> <!-- #postFilter -->

        <ul id="postItemList" v-if="postData.length > 0">
            <PostItem v-for="article in postData" :key="article.id" :article-id="article.id" />
        </ul> <!-- #postItemList -->

        <EmptyList v-else />
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