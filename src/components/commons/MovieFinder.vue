<template>
    <div id="movieFinder">
        <div id="movieFinderInput">
            <input type="text" id="txtSearchMovie" class="exclude" name="search-movie-query" placeholder="영화 제목 또는 키워드 입력..." @keydown.enter="searchIt">

            <span>ENTER</span>
        </div>

        <ul id="movieFinderList" v-if="movieArray.results?.length > 0">
            <li class="movie-search-item" :class="selectedMovie === movie ? 'selected' : null" v-for="movie in movieArray.results" :key="movie.id" @click="selectedMovie = movie">
                <div class="movie-search-poster-container">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-image-2-line"></use>
                    </svg>

                    <img class="movie-search-poster-image" v-if="!!movie.poster_path" :src="`https://image.tmdb.org/t/p/original/${ movie.poster_path }`" alt="">
                </div>

                <div class="movie-search-main-container">
                    <h6 class="movie-search-title">{{ movie.title }}</h6>

                    <div class="movie-search-info-container">
                        <p class="movie-search-release">{{ new Date(movie.release_date).getFullYear() + ' 년' }}</p>

                        <span>·</span>

                        <div class="movie-search-genre-container">
                            <span class="movie-search-genre" v-for="genre in movie.genre_ids">{{ genreList.find(item => item.id === genre).name }}</span>
                        </div>
                    </div>
                </div>
            </li>
        </ul>

        <EmptyList v-else />
    </div> <!-- #movieFinder -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { movieCategories, searchMovies } from '../../utilities/dataQueries';

    const genreList = await movieCategories();
    const movieArray = ref([]);
    const selectedMovie = ref({});

    const searchIt = async (e) => {
        const findResult = await searchMovies(e.target.value);

        movieArray.value = findResult;
    }
</script> <!-- Logic Ends -->