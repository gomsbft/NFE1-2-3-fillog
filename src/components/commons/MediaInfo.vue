<template>
    <p class="media-info-container-label">이 포스트에서 리뷰한 영화</p>

    <div id="mediaInfoContainer">
        <div class="media-info-poster-container">
            <img class="media-info-poster-image" :src="`https://image.tmdb.org/t/p/original/${ currentMovie.poster_path }` ?? null" :alt="`영화 <${ currentMovie.title }>의 포스터 이미지`">
        </div>

        <dl class="media-info-text-container">
            <dt class="media-info-title">
                <h6>{{ currentMovie.title }} <span>{{ currentMovie.original_title }}</span></h6>
            </dt>

            <dd class="media-info-point" data-media-info-label="평점">
                <p>{{ currentMovie.vote_average }} 점 (총 {{ currentMovie.vote_count.toLocaleString('ko-KR') }} 건의 평가)</p>
            </dd>

            <dd class="media-info-directors" data-media-info-label="감독">
                <p v-for="directors in movieDirector" >{{ directors.name }}</p>
            </dd>

            <dd class="media-info-released" data-media-info-label="개봉연도">
                {{ new Date(currentMovie.release_date).getFullYear() + ' 년' }}
            </dd>

            <dd class="media-info-overview" data-media-info-label="줄거리">
                {{ currentMovie.overview }}
            </dd>
        </dl>

        <img class="media-info-backdrop-image" v-if="currentMovie.backdrop_path" :src="`https://image.tmdb.org/t/p/original/${ currentMovie.backdrop_path }` ?? null" :alt="`영화 <${ currentMovie.title }>의 주요 장면`">
    </div> <!-- #mediaInfoContainer -->
</template> <!-- Template Ends -->

<script setup>
    import { getMovieInfo } from '../../utilities/dataQueries';

    const props = defineProps([ 'movieId' ]);
    const currentMovie = await getMovieInfo(props.movieId);
    const movieDirector = currentMovie.credits.crew.filter(({ job }) => job === 'Director');

    console.log(currentMovie);
</script> <!-- Logic Ends -->