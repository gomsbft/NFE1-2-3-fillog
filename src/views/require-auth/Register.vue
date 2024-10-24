<!-- <template>
    <form id="frmRegister">

    </form> #frmRegister
</template> Template Ends

<script setup>

</script> Logic Ends -->


<template>
  <div class="container">
    <form @submit.prevent="register">
      <div>
        <label for="account">account:</label>
        <input v-model="form.account" id="account" type="email" required />
      </div>
      <div>
        <label for="password">password:</label>
        <input v-model="form.password" id="password" type="password" required />
      </div>
      <div>
        <label for="userName">username:</label>
        <input v-model="form.userName" id="userName" type="text" required />
      </div>
      <div>
        <label for="userImage">userImage:</label>
        <img src="" alt="">
        <input @change="imgUplod"  type="file" id="userImage" accept="image/jpeg, image/png, image/webp">
        <img :src="previewImageUrl || ''" alt="이미지 미리보기" />
      </div>
      <button type="submit">Register</button>
      <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success">{{ successMessage }}</div>
    </form>
  </div>
</template> 

<script setup>
  import { reactive, ref } from 'vue';
  import axios from 'axios';
  
  
  // 상태 관리
  const form = reactive({
    account: '',
    password: '',
    userName: '',
    userImage: null,
    commentedArticles: [],
  });
  
  // 에러 메시지, 성공 메시지 저장
  const errorMessage = ref('');
  const successMessage = ref('');
  
  const previewImageUrl = ref(null);
  
  // 비밀번호가 8자 이상 12자 이하인지 확인
  const isValidPasswordLength = (password) => {
    return password.length >= 8 && password.length <= 12;
  };
  
  // 이미지 처리
  const imgUplod = (event) => {
    const file = event.target.files[0]; 
    form.userImage = file;   
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImageUrl.value = e.target.result; 
      };
      reader.readAsDataURL(file); 
    }
  };
  
  
  const register = async () => {
    //비밀번호 길이 체크
    if (!isValidPasswordLength(form.password)) {
      errorMessage.value = '비밀번호는 8자 이상 12자 이하로 입력해 주세요.'; // 비밀번호 길이 오류 시 메시지 설정
      successMessage.value = '';                                              
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('account', form.account);
      formData.append('password', form.password);
      formData.append('userName', form.userName);
      formData.append('userImage', form.userImage);
      formData.append('commentedArticles', form.commentedArticles);

      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }


      // 서버로 회원가입 요청을 보냅니다.
      const response = await axios.post('http://localhost:3000/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 파일 업로드 시 multipart/form-data 설정 필요
        },
      });         
      const token = response.data.token;
      localStorage.setItem('token', token);         
    } catch (err) {
      // 서버 요청 중 에러 발생 시 처리
      errorMessage.value = err.response?.data?.message || '회원가입 중 오류가 발생했습니다.'; // 에러 메시지를 서버 응답에 따라 설정
      successMessage.value = ''; 
    }
  };
</script>


<style lang="scss" scoped>

</style>