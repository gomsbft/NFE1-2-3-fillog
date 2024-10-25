import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('currentUser', () => {
    const state = ref({
        userName: '홍길동'
    });

    const setUser = (userObject) => {
        state.value = userObject;
    }

    return { state, setUser }
});

/**
 * 사용자 계정 정보
 */