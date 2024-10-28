<template>
    <div class="page-filter-container">
        <label class="page-filter-type-label">
            <svg class="remix">
                <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ labelIcon }`"></use>
            </svg>

            <span>{{ labelText }}</span>
        </label>

        <div class="page-filter-wrapper">
            <swiper-container id="pageFilterSlider" v-bind="swiperParams">
                <swiper-slide v-for="(filter, index) in filterArray">
                    <button :key="index" type="button" class="button-filter-selector" :class="filter.value === currentValue ? 'active' : null" :value="filter.value" @click="currentValue = filter.value">
                        {{ filter.name }}
                    </button>
                </swiper-slide>
            </swiper-container>
        </div>
    </div>
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';

    const props = defineProps([ 'labelIcon', 'labelText', 'filterArray', 'originValue' ]);
    const currentValue = ref(props.originValue);

    const swiperParams = {
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 8
    };
</script> <!-- Logic Ends -->