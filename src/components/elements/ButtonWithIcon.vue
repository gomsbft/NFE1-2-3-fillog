<template>
    <button type="button" :id="props.elementId" class="buttons with-icon" :class="iconPosition" :title="props.toolTip">
        <svg class="remix" v-if="props.iconName">
            <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ props.iconName }`"></use>
        </svg>

        <span>
            <slot></slot>
        </span>
    </button>
</template> <!-- Template Ends -->

<script setup>
    const props = defineProps([ 'elementId', 'iconPosition', 'iconName', 'toolTip' ]);

    // icon position 은 front, back, only 3가지로 사용된다.
    // icon name 이 지정되지 않은 경우 아이콘 영역이 제거된다.
</script> <!-- Logic Ends -->

<style lang="scss" scoped>

</style> <!-- Stylesheet Ends -->