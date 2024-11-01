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

    const postData = await getTotalPosts();

    const featuredMovies = ref(postData.map(item => { if (item.movieID !== null) return { movieID: item.movieID, genres: item.movieGenres, articleID: item._id } }).filter(item => !!item));
    const genreList = await movieCategories();

    genreList.unshift({ name: '전체', id: 0 });

    const getCurrentFilter = (data) => { // 장르 필터 반환값
        console.log(data);
    }
</script> <!-- Logic Ends -->