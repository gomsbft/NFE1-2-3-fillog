import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLoaderStore = defineStore('isLoading', () => {
    const state = ref(false);

    const setLoadTrue = () => {
        state.value = true;
    }

    const setLoadFalse = () => {
        state.value = false;
    }

    return { state, setLoadTrue, setLoadFalse }
});

/**
 * 페이지 로딩 상태
 */