<template>
    <div id="filmList">
        <h1 class="page-title">리뷰한 영화</h1>

        <div id="filmGenres" class="page-filter-container">
            <label class="page-filter-type-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-movie-2-fill"></use>
                </svg>

                <span>영화 장르</span>
            </label>

            <div id="filmGenreContainer" class="page-filter-wrapper">
                <button type="button" class="button-filter-selector active">
                    분류 없음
                </button>

                <button type="button" class="button-filter-selector">
                    코미디
                </button>

                <button type="button" class="button-filter-selector">
                    호러
                </button>
            </div> <!-- #filmGenreContainer -->
        </div> <!-- #filmGenres -->

        <ul id="filmItemList" v-if="myFilmList.length > 0">

        </ul> <!-- #filmItemList -->

        <EmptyList v-else />
    </div> <!-- #filmList -->
</template> <!-- Template Ends -->

<script setup>
    import { getMovieInfo } from '../utilities/dataQueries';

    const myFilmList = [];
</script> <!-- Logic Ends -->