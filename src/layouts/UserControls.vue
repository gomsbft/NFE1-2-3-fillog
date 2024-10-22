<template>
    <aside id="userControls">
        <div class="user-info-container" v-if="isLoggedIn === false">
            <ButtonWithIcon element-id="btnLogin" icon-position="back" icon-name="key-fill" >
                로그인
            </ButtonWithIcon>
        </div>

        <div class="user-info-container" v-else>
            <ButtonWithIcon element-id="btnConfig" icon-position="only" icon-name="user-fill">
                사용자 설정
            </ButtonWithIcon>

            <ButtonWithIcon element-id="btnLogout" icon-position="back" icon-name="logout-box-r-line" style="--button-surface-color: 0 0 0 / 0; --button-outline-color: var(--clr-theme) / .5; --button-text-color: var(--clr-theme);">
                로그아웃
            </ButtonWithIcon>
        </div>
    </aside> <!-- #userColtrols -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { useUserStore } from '../stores/userInfo';

    const isLoggedIn = ref(true); // 임시 로그인 여부
    const user = useUserStore(); // 로그인 사용자 스토어
</script> <!-- Logic Ends -->