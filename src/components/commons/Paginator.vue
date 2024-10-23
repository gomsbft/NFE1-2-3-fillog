<template>
    <div id="lstPaginator">
        <button type="button" id="btnPrevPage">
            <span>이전</span>
        </button>

        <ul>
            <li></li>
        </ul>

        <button type="button" id="btnNextPage">
            <span>다음</span>
        </button>
    </div> <!-- #lstPaginator -->
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'dataList', 'itemsPerPage', 'bulletsPerGroup' ]);
</script> <!-- Logic Ends -->