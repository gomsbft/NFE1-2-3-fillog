import { ref } from 'vue';
import { defineStore } from 'pinia';

export const userLogin = defineStore('isLogin', () => {
    const logins = ref(false);

    // 로그인 상태 true
    const setLoginTrue = () => {
        logins.value = true;
    }

    // 로그인 상태 false (로그아웃)
    const setLoginFalse = () => {
        logins.value = false;
    }

    return { logins, setLoginTrue, setLoginFalse }
});