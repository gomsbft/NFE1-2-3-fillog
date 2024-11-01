<template>
    <div id="frmPostWrite">
        <div class="top_btn">
            <h2>Post</h2>
            <select name="category" id="category" v-model="selectedCategory">
                <option value="all" selected>==카테고리==</option>
                <option v-for="(category, value) in movieCategory" :key="value" :value="value">
                    {{ category }}
                </option>
            </select>
        </div>
        <input type="text" name="title" id="title" placeholder="제목을 입력해주세요." v-model="title"><br>
        <textarea name="content" id="content" placeholder="내용을 입력해주세요." v-model="content"></textarea>
        <div class="bot_btn">
            <div class="file_box">
                <label for="file">
                    <div class="file_upload">이미지 업로드</div>
                </label>
                <span> * 최대 3장까지 가능합니다.</span>
                <input type="file" name="file" id="file" @change="changeImage">
            </div>
            <button class="upload" @click="submitPost">작성</button>
        </div>
        <div class="preview">
            <div v-for="(img, idx) in previewImage" :key="idx">
                <img :src="img"/>
            </div>
        </div>
    </div> <!-- #frmPostWrite -->
</template> <!-- Template Ends -->

<script setup>
    import { ref } from 'vue';
    import axios from 'axios';
    import movieCategory from '../../datas/movieCategory.json';
    import { useRouter } from 'vue-router';

    const previewImage = ref([]);
    const title = ref('');
    const content = ref('');
    const selectedCategory = ref('');
    const router = useRouter();

    const changeImage = (e) => {
        if (previewImage.value.length >= 3) {
            alert('이미지는 최대 3장까지 업로드 가능합니다.');
            return;
        }

        const file = e.target.files[0];

        if (!file) {
            return;
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            previewImage.value.push(e.target.result);
        }

        reader.readAsDataURL(file);
    }

    const submitPost = async () => {
        const postData = {
            title: title.value,
            text: content.value,
            category: selectedCategory.value,
            images: previewImage.value,
            author: {
                userID: '671ae48150f0899c1d43f17c'
            }
        };

        try {
            const response = await axios.post('http://localhost:3000/post', postData);

            alert('게시글이 등록되었습니다.');
            router.push('/posts');
        } catch(error) {
            console.error('Error post:', error);
            alert('게시글 등록에 실패했습니다.');
        }
    };
</script> <!-- Logic Ends -->
