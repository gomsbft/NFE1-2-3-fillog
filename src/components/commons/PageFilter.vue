<template>
    <div class="page-filter-container">
        <label class="page-filter-type-label">
            <svg class="remix">
                <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ labelIcon }`"></use>
            </svg>

            <span>{{ labelText }}</span>
        </label>

        <div class="page-filter-wrapper">
            <swiper-container v-bind="swiperParams">
                <swiper-slide v-for="(filter, index) in filterArray">
                    <button :key="index" type="button" class="button-filter-selector" :class="filter.value === currentValue ? 'active' : null" :value="filter.value" @click="sendThis">
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
    const emits = defineEmits([ 'currentFilter' ]);
    const currentValue = ref(props.originValue);

    const swiperParams = {
        freeMode: true,
        slidesPerView: 'auto',
        spaceBetween: 8
    };

    const sendThis = (e) => { // 이후 emit으로 선택된 filter를 상위 컴포넌트로 전달시키는 내용이 필요하다.
        currentValue.value = e.target.value;

        emits('current-filter', currentValue.value);
    }
</script> <!-- Logic Ends -->