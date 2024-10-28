<template>
    <div id="filmList">
        <h1 class="page-title">리뷰한 영화</h1>

        <PageFilter id="filmGenres" label-icon="movie-2-fill" label-text="영화 장르" :filter-array="genresFilterArray" :origin-value="'all'" />

        <ul id="filmItemList" v-if="featuredMovies.length > 0">
            <MovieItem v-for="(movie, index) in featuredMovies" :key="index" :movie-id="movie.movieID" :article-id="movie.articleID" />
        </ul> <!-- #filmItemList -->

        <EmptyList v-else />
    </div> <!-- #filmList -->
</template> <!-- Template Ends -->

<script setup>
    import postData from '../datas/postData.json'; // 임시 게시물 데이터

    const genresFilterArray = [
        { name: '전체', value: 'all' },
        { name: '코미디', value: 'comedy' },
        { name: '공포', value: 'horror' },
        { name: '스릴러', value: 'thriller' },
        { name: '로맨스', value: 'romance' }
    ]

    const featuredMovies = postData.map(item => { if (item.movieID !== null) return { movieID: item.movieID, articleID: item.id } }).filter(item => !!item);
</script> <!-- Logic Ends -->