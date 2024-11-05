<template>
  <div id="postEdit">
    <div class="top">
      <h1>게시물 수정</h1>
      <select v-model="cate">
        <option value="all">==카테고리==</option>
        <option v-for="(category, value) in movieCategory" :key="value" :value="value">
          {{ category }}
        </option>
      </select>
    </div>
    <input v-model="title" type="text" placeholder="제목을 입력하세요" />
    <textarea v-model="content" placeholder="내용을 입력하세요"></textarea>
    <div class="bot">
      <div class="image_area" v-for="(image, idx) in images" :key="idx">
        <img :src="image" />
        <button class="del_photo" @click="delPhoto(idx)">×</button>
      </div>
    </div>
    <div class="btns">
      <div class="file_box">
          <label for="file">
              <div class="file_upload">이미지 업로드</div>
          </label>
          <span> * 최대 3장까지 가능합니다.</span>
          <input type="file" name="file" id="file" @change="addPhoto" />
      </div>
      <button class="edit_btn" @click="editPost">수정 완료</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import movieCategory from '../datas/movieCategory.json';

const route = useRoute();
const router = useRouter();
const postID = route.params.postID;

// 게시물 데이터를 저장하는 변수
const title = ref('');
const content = ref('');
const cate = ref('');
const images = ref([]);

// 게시물 데이터 불러오기
const fetchPostData = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${postID}`);
    title.value = response.data.title;
    content.value = response.data.content;
    cate.value = response.data.category;
    images.value = response.data.images;
  } catch (err) {
    console.error('Error fetching post data:', err);
  }
};

// 사진 삭제
const delPhoto = (i) => {
  images.value = images.value.filter((_, imgIndex) => imgIndex !== i);
}

// 사진 추가
const addPhoto = (e) => {
  const files = e.target.files;

  if(images.value.length >= 3) {
    alert('사진은 3장까지만 업로드 가능합니다');
    return;
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = (e) => {
      images.value.push(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

// 게시물 수정 요청
const editPost = async () => {
  try {
    await axios.put(`http://localhost:3000/posts/${postID}`, {
      title: title.value,
      content: content.value,
      category: cate.value,
      images: images.value
    });
    alert('게시물이 수정되었습니다.');
    router.push(`/posts/${postID}`); // 수정 후 해당 게시물 상세 페이지로 이동
  } catch (error) {
    console.error('Error updating post:', error);
    alert('게시물 수정에 실패했습니다.');
  }
};

// 페이지 로드 시 게시물 데이터 불러오기
onMounted(() => {
  fetchPostData();
});
</script>

<style lang="scss" scoped>
    @import 'src/assets/stylesheets/views/_postEdit.scss';
</style> <!-- Stylesheet Ends -->