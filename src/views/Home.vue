<template>
    <div id="landingPage">
        <section id="secHero">
            <div id="heroContent">
                <img :src="latestPost.images[latestPost.thumbIndex].imageURL" alt="">

                <div>
                    <p>
                        {{ latestPost.title }}
                    </p>

                    <UserNameTag :user-id="latestPost.author.userId" />
                </div>
            </div>
        </section> <!-- #secHero -->

        <section id="secLatestMovies">
            <div class="section-title-bar">
                최근 리뷰한 영화
            </div>

            <MovieItem :movie-object="getMovieInfo(500)" />
            <MovieItem :movie-object="getMovieInfo(550)" />
        </section> <!-- #secLatestMovies -->
    </div> <!-- #landingPage -->
</template> <!-- Template Ends -->

<script setup>
    import { ref, watch } from 'vue';
    import { getMovieInfo } from '../utilities/dataQueries';
    import postData from '../datas/postData.json'; // 임시 게시물 데이터

    postData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const latestPost = postData[postData.length - 1]; // 가장 최근 글
    const searchUrl = 'https://api.themoviedb.org/3/search/movie?query=' // 검색 예시
</script> <!-- Logic Ends -->