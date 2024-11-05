<template>
    <div id="filmList">
        <h1 class="page-title">리뷰한 영화</h1>

        <PageFilter id="filmGenres" label-icon="movie-2-fill" label-text="영화 장르" :filter-array="genreList.map(item => { return { name: item.name, value: item.id.toString() } })" :origin-value="'0'" @current-filter="getCurrentFilter" />

        <ul id="filmItemList" v-if="featuredMovies.length > 0">
            <MovieItem v-for="(movie, index) in featuredMovies" :key="index" :movie-id="movie.movieID" :article-id="movie.articleID" />
        </ul> <!-- #filmItemList -->

        <EmptyList v-else />
    </div> <!-- #filmList -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { getTotalPosts, movieCategories } from '../utilities/dataQueries';

    const originPostData = ref(await getTotalPosts()); // 게시물 전체 데이터 배열
    const mappedPostData = ref(originPostData.value.filter(item => !!item.movieID).map(item => { return { movieID: item.movieID, genres: item.movieGenres, articleID: item._id } })); // 영화 리뷰 글만 필터링한 배열
    const featuredMovies = ref(mappedPostData.value); // 최종 출력을 위한 반응형 배열
    const currentFilter = ref(0);
    const genreList = await movieCategories();

    genreList.unshift({ name: '전체', id: 0 });

    const getCurrentFilter = (data) => { // 장르 필터 반환값을 최종 출력 배열에 적용
        currentFilter.value = Number(data);
        featuredMovies.value = [];

        if (currentFilter.value === 0) return featuredMovies.value = mappedPostData.value;

        featuredMovies.value = mappedPostData.value.filter(item => item.genres.includes(currentFilter.value, 0));
    }
</script> <!-- Logic Ends -->