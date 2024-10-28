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
            </div> <!-- 아마도 슬라이더로 변경될 예정 -->
        </section> <!-- #secHero -->

        <section id="secLatestMovies">
            <div class="section-title-bar">
                최근 리뷰한 영화
            </div>

            <div style="display: grid; grid-template-columns: repeat(4, 1fr); place-items: center; row-gap: 2.4rem;">
                <MovieItem v-for="(movie, index) in featuredMovies" :key="index" :movie-id="movie.movieID" />
            </div> <!-- 임시 영화 정보 아이템 컨테이너 -->
        </section> <!-- #secLatestMovies -->
    </div> <!-- #landingPage -->
</template> <!-- Template Ends -->

<script setup>
    import { useRouter } from 'vue-router';
    import { userLogin } from '../stores/isLogin';

    const router = useRouter();
    const log = userLogin();

    if(!log.logins) {
        router.push('/login'); 
    }


    import postData from '../datas/postData.json'; // 임시 게시물 데이터

    postData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const latestPost = postData[postData.length - 1]; // 가장 최근 글
    const featuredMovies = postData.map(item => { if (item.movieID !== null) return { movieID: item.movieID, articleID: item.id } }).filter(item => !!item);
    const searchUrl = 'https://api.themoviedb.org/3/search/movie?query=' // 영화 검색 API
</script> <!-- Logic Ends -->