<template>
  <div>
    <form @submit.prevent="login">
      <div>
        <label for="account">account:</label>
        <input v-model="form.account" id="account" type="email" required>
      </div>
      <div>
        <label for="password">password:</label>
        <input v-model="form.password" id="password" type="password" required>
      </div>
      <button type="submit">Login</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </form> 
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';
  import axios from 'axios';
  
  const form = reactive({
    account: '',
    password: '',
  });
  
  const errorMessage = ref('');
  const successMessage = ref('');
  
  const login = async () => {
    try {
      // JSON 형식으로 전송
      const response = await axios.post('http://localhost:3000/login', {
        account: form.account,
        password: form.password
      });
      
      // 성공 시 처리 (예: 토큰 저장)
      const token = response.data.token;
      localStorage.setItem('token', token); // 로그인 토큰을 로컬 스토리지에 저장
      successMessage.value = '로그인 성공!';
      errorMessage.value = ''; // 에러 메시지 초기화
    } catch (err) {
      // 실패 시 에러 메시지 처리
      errorMessage.value = err.response?.data?.message || '로그인 중 오류가 발생했습니다.';
      successMessage.value = ''; // 성공 메시지 초기화
    }
  };
</script>
