<template>
  <div id="viewUserInfo">
      <p class="title">블로그 명</p>
      <h6 class="text">{{ blogOwner.blogName }}</h6>
      <p class="title">블로그 관리자</p>
      <p class="text">{{ blogOwner.adminName }}</p>
      <p class="title">블로그 시작일</p>
      <p class="text">2024-10-25</p>
  </div> <!-- #viewUserInfo -->
</template> <!-- Template Ends -->

<script setup>

  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';


  // 관리자(admin)의 이미지와 이름을 저장하는 ref
  const blogOwner = ref({
      adminImage: null,
      adminName: "블로그 관리자", // user가 볼 수 있는 admin의 이름
      blogName: "블로그 이름",
      tags: [],

  });

  const fetchAdminInfo = async () => {
  
      try {
          // 서버에서 관리자 정보를 가져옵니다.
          const response = await axios.get("http://localhost:3000/admin-info");

          // 응답에서 관리자 정보 데이터를 구조 분해 할당을 통해 추출합니다.
          const { adminImage, userName, blogName, tags } = response.data;

          // 가져온 데이터를 blogOwner의 속성에 각각 할당합니다.
          blogOwner.value.adminImage = adminImage;
          blogOwner.value.adminName = userName;
          blogOwner.value.blogName = blogName;
          blogOwner.value.tags = tags;

      } catch (error) {
          console.error("관리자 정보 가져오기 실패(클라이언트):", error);
      }
  };



  onMounted(() => {
      fetchAdminInfo(); 
  });

</script> <!-- Logic Ends -->

<style lang="scss" scoped>
  @use '../assets/stylesheets/views/userinfo';
</style>