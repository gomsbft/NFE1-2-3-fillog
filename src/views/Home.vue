<template>
    <div id="landingPage">
        <section id="secHero">
            <div class="section-title-bar">
                최근 작성한 포스트
            </div>

            <div id="heroSliderContainer">
                <swiper-container id="heroSlider" v-bind="swiperParams">
                    <swiper-slide class="hero-slide" v-for="article in latestPosts" :key="article._id" :data-article-date="dateFormat(article.createdAt)">
                        <RouterLink :to="`posts/${ article._id }`">
                            <img class="latest-article-thumbnail" v-if="article.images.length > 0" :src="article.images[article.thumbIndex].imageURL" alt="포스트 미리보기 이미지">

                            <div class="latest-article-thumbnail no-image" v-else></div>

                            <div class="latest-article-text">
                                <p class="latest-article-title">{{ article.title }}</p>

                                <UserNameTag :user-id="article.author" />
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
    import { getTotalPosts } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';

    const postData = await getTotalPosts();

    postData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const latestPosts = postData.slice(0, 5); // 가장 최근 글
    const featuredMovies = postData.map(item => { if (item.movieID !== null) return { movieID: item.movieID, articleID: item._id } }).filter(item => !!item).slice(0, 10);
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