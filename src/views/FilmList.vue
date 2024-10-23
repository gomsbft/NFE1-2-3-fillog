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
                <button type="button" class="button-genre-selector active">
                    분류 없음
                </button>

                <button type="button" class="button-genre-selector">
                    코미디
                </button>

                <button type="button" class="button-genre-selector">
                    호러
                </button>
            </div> <!-- #filmGenreContainer -->
        </div> <!-- #filmGenres -->

        <div class="empty-item-list">
            <svg class="remix">
                <use xlink:href="/miscs/remixicon.symbol.svg#ri-ghost-line"></use>
            </svg>

            <p>아직 게시물이 없어요.</p>
        </div>
    </div> <!-- #filmList -->
</template> <!-- Template Ends -->

<script setup>

</script> <!-- Logic Ends -->