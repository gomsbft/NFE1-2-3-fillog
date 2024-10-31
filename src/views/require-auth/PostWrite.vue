<template>
    <div id="frmPostWrite">
        <h1 class="page-title">포스트 작성</h1>

        <div id="writeUpperArea">
            <select name="category" id="slctCategory" class="exclude write-form-inputs" v-model="selectedCategory">
                <option value="" disabled>카테고리 선택</option>

                <option v-for="(category, value) in articleCategory" :key="value" :value="value">
                    {{ category }}
                </option>
            </select>

            <ButtonWithIcon element-id="btnUploadPost" icon-position="front" icon-name="upload-line" tool-tip="포스트 업로드" @click="submitPost">
                작성 완료
            </ButtonWithIcon>
        </div>

        <input type="text" name="title" id="txtArticleTitle" class="exclude write-form-inputs" placeholder="포스트 제목" v-model="title">

        <textarea name="content" id="txtArticleContent" class="exclude" placeholder="포스트 내용 입력..." v-model="content"></textarea>

        <div class="bot_btn">
            <div class="file_box">
                <ButtonWithIcon element-id="btnUploadImages" icon-position="front" icon-name="image-add-line" tool-tip="이미지 업로드" @click="fileUploader.click()">
                    이미지 업로드
                </ButtonWithIcon>

                <span> * 최대 3장까지 가능합니다.</span>

                <input type="file" name="file-post-image-uploader" id="filePostImages" ref="file-uploader" @change="changeImage">
            </div>

        </div>

        <div class="preview">
            <div v-for="(img, idx) in previewImage" :key="idx">
                <img :src="img"/>
            </div>
        </div>

        <MovieFinder />
    </div> <!-- #frmPostWrite -->
</template> <!-- Template Ends -->

<script setup>
    import { ref, useTemplateRef } from 'vue';
    import { useRouter } from 'vue-router';
    import axios from 'axios';
    import MovieFinder from '../../components/commons/MovieFinder.vue';
    import articleCategory from '../../datas/articleCategory.json';

    const router = useRouter();
    const fileUploader = useTemplateRef('file-uploader'); // input:file 이벤트 추가를 위한 템플릿 레퍼런스
    const previewImage = ref([]);
    const title = ref();
    const content = ref();
    const selectedCategory = ref('');

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
                userID: 123125 // 임시 값
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
