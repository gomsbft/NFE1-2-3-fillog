<template>
    <div id="guestBook">
        <h1 class="page-title">방명록</h1>

        <div id="guestFilter" class="page-filter-container">
            <label class="page-filter-type-label">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-corner-down-right-line"></use>
                </svg>

                <span>답글 여부</span>
            </label>

            <div class="page-filter-wrapper">
                <button type="button" class="button-filter-selector active">
                    전체
                </button>

                <button type="button" class="button-filter-selector">
                    답글 있음
                </button>

                <button type="button" class="button-filter-selector">
                    답글 없음
                </button>
            </div>
        </div>

        <ul></ul>

        <EmptyList />
    </div> <!-- #guestBook -->
</template> <!-- Template Ends -->

<script setup>

</script> <!-- Logic Ends -->