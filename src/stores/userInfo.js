import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('currentUser', () => {
    const state = ref({ userID: null, token: null });

    const setUser = (userObject) => {
        state.value = userObject;
    }

    const removeUser = () => {
        state.value = { userID: null, token: null }
    }

    return { state, setUser, removeUser }
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
 * setUser(< userObject >) : 로그인 한 사용자 객체를 스토어에 저장
 * removeUser() : 로그아웃 시 스토어에서 사용자 객체 제거 (초기화)
 *
 * ===== 4. 게터 메소드 =====
 *
 * (없음)
 */