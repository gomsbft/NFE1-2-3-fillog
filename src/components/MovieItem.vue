<template>
    <article class="movie-item">
        <RouterLink :to="`posts/${ articleId }`">
            <div class="movie-poster-container">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-movie-2-fill"></use>
                </svg>

                <img class="movie-poster-image" v-if="currentMovie.poster_path" :src="`https://image.tmdb.org/t/p/original/${ currentMovie.poster_path }` ?? null" :alt="`영화 <${ currentMovie.title }>의 포스터 이미지`">
            </div>

            <div class="movie-info-container">
                <p class="movie-info-title">
                    {{ currentMovie.title ?? '(알 수 없음)' }}
                </p>

                <div class="movie-info-minors">
                    <p class="movie-info-release">{{ new Date(currentMovie.release_date).getFullYear() + ' 년' ?? '(알 수 없음)' }}</p>

                    <span>·</span>

                    <StarPoints :average-point="currentMovie.vote_average" />
                </div>

                <div class="movie-info-genre">
                    <span v-for="genre in currentMovie.genres" :key="genre.id">
                        {{ genre.name }}
                    </span>

                    <span v-if="!currentMovie.genres">
                        장르 없음
                    </span>
                </div>
            </div>
        </RouterLink>
    </article>
</template> <!-- Template Ends -->

<script setup>
    import { RouterLink } from 'vue-router';
    import { getMovieInfo } from '../utilities/dataQueries';

    const props = defineProps([ 'movieId', 'articleId' ]);
    const currentMovie = await getMovieInfo(props.movieId);
</script> <!-- Logic Ends -->