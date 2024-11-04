<template>
    <form id="frmLogin" @submit.prevent="login" class="loginForm">
        <div class="section-title-bar">
            로그인
        </div>

        <div id="loginInputContainer">
            <div class="login-form-input-wrapper">
                <label for="txtLoginAccount">사용자 계정</label>
                <input type="email" id="txtLoginAccount" class="exclude" placeholder="example@email.com" v-model="loginFormData.userAccount">
            </div>

            <div class="login-form-input-wrapper">
                <label for="txtLoginPassword">비밀번호</label>
                <input type="password" id="txtLoginPassword" class="exclude" placeholder="비밀번호 입력..." v-model="loginFormData.userPassword">
            </div>

            <div id="labelLoginResult" v-if="responseMessage.message" :class="responseMessage.result ? 'success' : 'failed'">
                <svg class="remix">
                    <use :xlink:href="`/miscs/remixicon.symbol.svg#ri-${ responseMessage.result ? 'information-fill' : 'error-warning-fill' }`"></use>
                </svg>

                <span>{{ responseMessage.message }}</span>
            </div> <!-- #labelLoginResult -->

            <div id="loginButtonContainer">
                <ButtonWithIcon type="submit">로그인</ButtonWithIcon>
                <ButtonWithIcon @click="router.push('/register')">회원가입</ButtonWithIcon>
            </div> <!-- #loginButtonContainer -->
        </div> <!-- #loginInputContainer -->
    </form> <!-- #frmLogin -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import { userLogin } from '../../stores/isLogin';

    const router = useRouter();
    const log = userLogin();
    const responseMessage = ref(''); // 로그인 결과 메시지
    const loginFormData = ref({ // 로그인 객체
        userAccount: '',
        userPassword: ''
    });

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:3000/login', loginFormData.value);

            // 성공 시 처리 (예: 토큰 저장)
            const token = response.data.token;

            localStorage.setItem('token', token); // 로그인 토큰을 로컬 스토리지에 저장
            responseMessage.value = { result: true, message: '로그인 성공!' };
            log.setLoginTrue(); // 로그인 상태 true
            router.push('/');
        } catch(error) {
            // 실패 시 에러 메시지 처리
            responseMessage.value = { result: false, message: error.response?.data?.message || '로그인 중 오류가 발생했습니다.' };
        }
    }
</script> <!-- Logic Ends -->