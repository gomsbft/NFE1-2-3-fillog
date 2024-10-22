<template>
    <article class="movie-item">
        <div class="movie-poster-container">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-movie-2-line"></use>
            </svg>

            <img class="movie-poster-image" src="https://picsum.photos/240/320" alt="">
        </div>

        <div class="movie-info-container">
            <p class="movie-info-title">
                {{ movieObject?.title ?? '(알 수 없음)' }}
            </p>

            <p class="movie-info-release">2024. 01. 01.</p>

            <div class="movie-info-genre">
                <span>스릴러</span>
                <span>공포</span>
            </div>
        </div>
    </article>
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'movieObject' ]);
</script> <!-- Logic Ends -->