<template>
    <div id="landingPage">
        <section id="secHero">
            <div class="section-title-bar">
                최근 작성한 포스트
            </div>

            <div id="heroSliderContainer">
                <swiper-container id="heroSlider" v-bind="swiperParams">
                    <swiper-slide class="hero-slide" v-for="article in latestPosts">
                        <RouterLink :to="`posts/${ article.id }`">
                            <img class="latest-article-thumbnail" v-if="article.images.length > 0" :src="article.images[article.thumbIndex].imageURL" alt="">

                            <div class="latest-article-thumbnail no-image" v-else></div>

                            <div class="latest-article-text">
                                <p class="latest-article-title">{{ article.title }}</p>

                                <UserNameTag :user-id="article.author.userId" />
                            </div>
                        </RouterLink>
                    </swiper-slide>
                </swiper-container> <!-- #heroSlider -->

                <div class="hero-slider-pagination"></div>
            </div> <!-- #heroSliderContainer -->
        </section> <!-- #secHero -->

        <section id="secLatestMovies">
            <div class="section-title-bar">
                최근 리뷰한 영화
            </div>

            <div id="filmItemList">
                <MovieItem v-for="(movie, index) in featuredMovies" :key="index" :movie-id="movie.movieID" :article-id="movie.articleID" />
            </div> <!-- 임시 영화 정보 아이템 컨테이너 -->
        </section> <!-- #secLatestMovies -->
    </div> <!-- #landingPage -->
</template> <!-- Template Ends -->

<script setup>
    import { useRouter } from 'vue-router';
    import { userLogin } from '../stores/isLogin';
    import axios from 'axios';

    const userData = async() => {
        try {
            const response = await axios.get('http://localhost:3000/users');

            userData.value = response.data;
            console.log(userData.value)
        } catch (err) {
            console.error(err);
        }
    };
    userData()

    const router = useRouter();
    const log = userLogin();

    if(!log.logins) {
        router.push('/login'); 
    }

    import postData from '../datas/postData.json'; // 임시 게시물 데이터

    postData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const latestPosts = postData.slice(0, 5); // 가장 최근 글
    const featuredMovies = postData.map(item => { if (item.movieID !== null) return { movieID: item.movieID, articleID: item.id } }).filter(item => !!item).slice(0, 10);

    const swiperParams = {
        effect: 'coverflow',
        direction: 'vertical',
        spaceBetween: 24,
        loop: true,
        autoplay: {
            speed: 250,
            delay: 6000
        },
        pagination: {
            enabled: true,
            type: 'bullets',
            el: '.hero-slider-pagination',
        }
    };
</script> <!-- Logic Ends -->