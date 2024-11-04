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
        <option v-for="(category, value) in articleCategory" :key="value" :value="value">{{ category }}</option>
      </select>

      <div id="totalSearchContainer">
        <input type="text" name="search-keyword" id="txtTotalSearch" v-model="searchKeyword" placeholder="검색 키워드 입력...">

        <ButtonWithIcon element-id="btnTotalSearch" icon-position="only" icon-name="search-2-line" @click="searchPost">
          검색
        </ButtonWithIcon>
      </div> <!-- #totalSearchContainer -->
    </div> <!-- #postFilter -->

    <ul id="postItemList" v-if="filterPost.length > 0">
      <PostItem v-for="post in filterPost" :key="post._id" :post-object="post" />
    </ul> <!-- #postItemList -->

    <EmptyList v-else />
  </div> <!-- #postList -->
</template> <!-- Template Ends -->

<script setup>
  import { ref, computed } from 'vue';
  import { getTotalPosts } from '../utilities/dataQueries';
  import articleCategory from '../datas/articleCategory.json';

  const postData = ref(await getTotalPosts());
  const searchKeyword = ref('');
  const selectedCategory = ref('all');
    const filterPost = computed(() => {
      return postData.value.filter(article => {
        const matchKeyword = article.title.includes(searchKeyword.value) || article.text.includes(searchKeyword.value);
        const matchCategory = selectedCategory.value === 'all' || article.category === selectedCategory.value;
        return matchKeyword && matchCategory;
      });
  });

  const searchPost = () => {
    console.log(searchKeyword.value);
  }
</script> <!-- Logic Ends -->