<template>
    <div class="star-point-container" :style="`--point-percentage: ${ fixedPoint * 10 }%;`" :data-point="fixedPoint">
        <div class="star-point-base">
            <span class="star-point" v-for="item in 5">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-star-fill"></use>
                </svg>
            </span>
        </div>

        <div class="star-point-progress">
            <span class="star-point" v-for="item in 5">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-star-fill"></use>
                </svg>
            </span>
        </div>
    </div>
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'averagePoint' ]);

    const fixedPoint = props.averagePoint.toFixed(1);
</script> <!-- Logic Ends -->