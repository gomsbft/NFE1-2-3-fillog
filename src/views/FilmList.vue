<template>
    <div id="filmList">
        <h1 class="page-title">리뷰한 영화</h1>

        <div id="filmGenres" class="page-filter-container">
            <label class="page-filter-type-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-movie-2-fill"></use>
                </svg>

                <span>영화 장르</span>
            </label>

            <div id="filmGenreContainer" class="page-filter-wrapper">
                <button type="button" class="button-filter-selector active">
                    분류 없음
                </button>

                <button type="button" class="button-filter-selector">
                    코미디
                </button>

                <button type="button" class="button-filter-selector">
                    호러
                </button>
            </div> <!-- #filmGenreContainer -->
        </div> <!-- #filmGenres -->

        <ul id="filmItemList" v-if="featuredMovies.length > 0">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); place-items: center; row-gap: 2.4rem;">
                <MovieItem v-for="(movie, index) in featuredMovies" :key="index" :movie-id="movie.movieID" />
            </div> <!-- 임시 영화 정보 아이템 컨테이너 -->
        </ul> <!-- #filmItemList -->

        <EmptyList v-else />
    </div> <!-- #filmList -->
</template> <!-- Template Ends -->

<script setup>
    import postData from '../datas/postData.json'; // 임시 게시물 데이터

    const featuredMovies = postData.map(item => { if (item.movieID !== null) return { movieID: item.movieID, articleID: item.id } }).filter(item => !!item);
</script> <!-- Logic Ends -->