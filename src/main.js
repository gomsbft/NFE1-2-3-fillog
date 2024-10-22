import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { register } from 'swiper/element/bundle';
import VueDOMPurifyHTML from 'vue-dompurify-html'; // v-html 디렉티브에서 해로운 요소 제거

// Import --- System

import router from './router';
import './assets/stylesheets/style.css';

// Import --- Defaults

import App from './App.vue';

const myProject = createApp(App);
const pinia = createPinia();

register(); // Swiper Element 등록

import ButtonWithIcon from './components/elements/ButtonWithIcon.vue'; // 아이콘이 있는 버튼 (버튼 기본형)
import UserNameTag from './components/elements/UserNameTag.vue'; // 사용자 네임 태그
import SpinLoader from './components/commons/SpinLoader.vue'; // 로딩 표시기
import CustomAlert from './components/CustomAlert.vue'; // 커스텀 얼럿
import ImageViewer from './components/ImageViewer.vue'; // 슬라이더 이미지 뷰어

// Import - Global Components (mount 이전에 선언되어야 함)

myProject.component('ButtonWithIcon', ButtonWithIcon);
myProject.component('UserNameTag', UserNameTag);
myProject.component('SpinLoader', SpinLoader);
myProject.component('CustomAlert', CustomAlert);
myProject.component('ImageViewer', ImageViewer);

// 앱 정의

myProject
    .use(router)
    .use(pinia)
    .use(VueDOMPurifyHTML)
    .mount('#app')