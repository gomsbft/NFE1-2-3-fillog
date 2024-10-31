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
 * ===== 1. 스토어 설명 =====
 *
 * 페이지 로딩 상태 표시를 위한 전역 State
 *
 * ===== 2. 스토어 반환 객체 =====
 *
 * Boolean (True / False)
 *
 * ===== 3. 세터 메소드 =====
 *
 * setLoadTrue(), setLoadFalse()
 *
 * ===== 4. 게터 메소드 =====
 *
 * (없음)
 */