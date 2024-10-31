import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('currentUser', () => {
    const state = ref({
        userID: null,
        token: null
    });

    const setUser = (userObject) => {
        state.value = userObject;
    }

    return { state, setUser }
});

/**
 * ===== 1. 스토어 설명 =====
 *
 * 로그인 사용자 계정 정보
 *
 * ===== 2. 스토어 반환 객체 =====
 *
 * (사용자 객체 자료형)
 *
 * ===== 3. 세터 메소드 =====
 *
 * setUser(< userObject >)
 *
 * ===== 4. 게터 메소드 =====
 *
 * (없음)
 */