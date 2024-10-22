<template>
    <div id="landingPage">
        <section id="secHero">
            <img :src="latestPost.images[latestPost.thumbIndex].imageURL" alt="">

            <div>
                <p>
                    {{ latestPost.title }}
                </p>

                <UserNameTag :user-id="latestPost.author.userId" />
            </div>
        </section> <!-- #secHero -->

        <section id="secLatestMovies">
            최근 리뷰된 영화
        </section> <!-- #secLatestMovies -->
    </div> <!-- #landingPage -->
</template> <!-- Template Ends -->

<script setup>
    import postData from '../datas/postData.json';

    postData.sort((a, b) => new Date(a.date) - new Date(b.date));

    const latestPost = postData[postData.length - 1]; // 가장 최근 글
</script> <!-- Logic Ends -->

<style lang="scss" scoped>

</style> <!-- Stylesheet Ends -->