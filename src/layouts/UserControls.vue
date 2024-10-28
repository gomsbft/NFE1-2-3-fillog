<template>
    <aside id="userControls">
        <div class="user-info-container" v-if="log.logins === false">
            <ButtonWithIcon element-id="btnLogin" icon-position="back" icon-name="key-fill" @click="loginAction" >
                로그인
            </ButtonWithIcon>
        </div>

        <div class="user-info-container" v-else>
            <ButtonWithIcon element-id="btnConfig" icon-position="only" icon-name="user-fill">
                사용자 설정
            </ButtonWithIcon>

            <ButtonWithIcon element-id="btnLogout" icon-position="back" icon-name="logout-box-r-line" @click="logoutAction" style="--button-surface-color: 0 0 0 / 0; --button-outline-color: var(--clr-theme) / .5; --button-text-color: var(--clr-theme);">
                로그아웃
            </ButtonWithIcon>
        </div>
    </aside> <!-- #userColtrols -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../stores/userInfo';
    import { useRouter } from 'vue-router';
    import { userLogin } from '../stores/isLogin';

    const router = useRouter();
    const log = userLogin();     // 로그인 상태
    const user = useUserStore(); // 로그인 사용자 스토어

    // 로그인 아이콘 누르면 /login으로 이동
    const loginAction = () => {
        router.push('/login');
    };

    // 로그아웃 
    const logoutAction = () => {
        log.setLoginFalse(); // 로그아웃 상태로 전환하여 로그인 상태를 false로 설정
        localStorage.removeItem('token'); // 저장된 토큰 삭제
        router.push('/login');
    };
</script> <!-- Logic Ends -->