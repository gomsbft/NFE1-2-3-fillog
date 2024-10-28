import { ref } from 'vue';
import { defineStore } from 'pinia';

export const userLogin = defineStore('isLogin', () => {
    const logins = ref(false);

    // 로그인 상태를 true로 설정하는 함수
    const setLoginTrue = () => {
        logins.value = true;
    }

    // 로그인 상태를 false로 설정하는 함수 (로그아웃)
    const setLoginFalse = () => {
        logins.value = false;
    }

    return { logins, setLoginTrue, setLoginFalse }
});