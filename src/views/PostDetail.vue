<template>
  <article id="postDetail"  v-if="Object.keys(thisArticle).length > 0">
    <div id="postImageSlider" v-if="thisArticle.images && thisArticle.images.length > 0">
      <swiper-container v-bind="swiperParams">
        <swiper-slide
          class="article-image-slide"
          v-for="(imgItem, index) in thisArticle.images"
          :key="index"
        >
          <img
            class="article-image"
            :src="imgItem.imageURL"
            :alt="imgItem.alt"
          />
        </swiper-slide>
      </swiper-container>

      <button type="button" class="slider-prev-el" title="이전 이미지">
        <svg class="remix">
          <use
            xlink:href="/miscs/remixicon.symbol.svg#ri-arrow-left-s-line"
          ></use>
        </svg>
      </button>

      <button type="button" class="slider-next-el" title="다음 이미지">
        <svg class="remix">
          <use
            xlink:href="/miscs/remixicon.symbol.svg#ri-arrow-right-s-line"
          ></use>
        </svg>
      </button>

      <div class="slider-pagination"></div>
    </div>
    <!-- #postImageSlider - 이미지가 존재할 때 -->

    <div id="postImageSlider" class="no-images" v-else></div>
    <!-- #postImageSlider - 이미지가 없을 때 -->

    <div id="postInformations">
      <p class="article-info-category">
        {{ postCategory[thisArticle.category] }}
      </p>

      <h1 id="postTitle">{{ thisArticle.title }}</h1>
      <!-- postTitle -->

      <div id="postSummaries">
        <UserNameTag :user-id="thisArticle.author.userId" />

        <span>·</span>

        <p class="article-info-date">
          {{
            new Date(thisArticle.date).toLocaleDateString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })
          }}
        </p>

        <span>·</span>

        <p class="article-info-time">{{ thisArticle.time }}</p>

        <span>·</span>

        <!-- 게시물 좋아요 수 -->
        <p class="article-info-likes">
          <svg class="remix">
            <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-fill"></use>
          </svg>

          <span>{{ displayLikes }}</span>
        </p>
      </div>
      <!-- #postSummaries -->
    </div>
    <!-- #postInformations -->

    <div id="articleText" v-dompurify-html="thisArticle.text"></div>
    <!-- #articleText -->

    <MediaInfo
      v-if="thisArticle.movieID !== null"
      :movie-id="thisArticle.movieID"
    />

    <div id="postControls">
      <button
        type="button"
        class="button-post-controls"
        @click="likeBtnHandler"
        title="좋아요"
        style="--button-icon-color: var(--clr-alert)"
      >
        <svg class="remix">
          <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-line"></use>
        </svg>

        <span>좋아요</span>
      </button>

      <button
        type="button"
        class="button-post-controls"
        title="영화 정보"
        style="--button-icon-color: var(--clr-clear)"
      >
        <svg class="remix">
          <use xlink:href="/miscs/remixicon.symbol.svg#ri-movie-2-line"></use>
        </svg>

        <span>작품 정보</span>
      </button>

      <button
        type="button"
        class="button-post-controls"
        title="공유"
        style="--button-icon-color: var(--clr-warn)"
      >
        <svg class="remix">
          <use xlink:href="/miscs/remixicon.symbol.svg#ri-share-2-line"></use>
        </svg>

        <span>공유</span>
      </button>
    </div>
    <!-- #postControls -->

    <div id="postReplies">
      <div class="post-replies-titlebar">
        <div class="reply-bubble-animation">
          <svg class="remix">
            <use xlink:href="/miscs/remixicon.symbol.svg#ri-chat-3-line"></use>
          </svg>

          <span></span>
          <span></span>
          <span></span>
        </div>

        <p>
          댓글 <span>·</span>
          <span class="replies-counter">{{
            thisArticle.comments.length.toLocaleString("ko-KR")
          }}</span>
        </p>
      </div>

      <div
        id="repliesContainer"
        class="empty"
        v-if="thisArticle.comments.length === 0"
      >
        <svg class="remix">
          <use
            xlink:href="/miscs/remixicon.symbol.svg#ri-chat-delete-line"
          ></use>
        </svg>

        <p>아직 댓글이 없어요.</p>
      </div>
      <!-- #repliesContainer - 댓글이 없을 때 -->

      <div id="repliesContainer" v-else>
        <ArticleReply
          v-for="(commentItem, index) in thisArticle.comments"
          :key="index"
          :reply-object="commentItem"
        />
      </div>
      <!-- #repliesContainer - 댓글이 존재할 때 -->

      <div id="replyEditor">
        <div id="replyingUser">
          <UserNameTag />
        </div>
        <!-- #replyingUser -->

        <div id="replyingInput">
          <textarea
            v-model="commentText"
            name="reply-input"
            id="txtReply"
            rows="3"
            placeholder="댓글은 내 마음을 비추는 거울입니다. 나 자신과 상대방을 위한 배려와 책임을 담아 작성해 주세요."
          ></textarea>

          <button type="button" id="btnSubmitReply" @click="commentBtnHandler">
            <svg class="remix">
              <use
                xlink:href="/miscs/remixicon.symbol.svg#ri-corner-down-left-line"
              ></use>
            </svg>

            <span>등록</span>
          </button>
        </div>
        <!-- #replyingInput -->
      </div>
      <!-- #replyEditor -->
    </div>
    <!-- #postReplies -->

    <div>
      <button @click="router.go(-1)">뒤로</button>
    </div>
  </article>
  <!-- #postDetail -->
</template>
<!-- Template Ends -->

<script setup>
import { useRouter, useRoute } from "vue-router";
import postData from "../datas/postData.json"; // 임시 데이터
import postCategory from "../datas/articleCategory.json"; // 임시 카테고리
import MediaInfo from "../components/commons/MediaInfo.vue";
import ArticleReply from "../components/ArticleReply.vue";
import { computed, onMounted, reactive, ref } from "vue";
import axios from "axios";

const router = useRouter();
const route = useRoute();
// 임시 데이터
const thisArticle = reactive(
  postData.find((item) => item.id === parseInt(route.params.postID))
);
// DB 데이터
const ArticleInDB = reactive({likes: []});

const getArticle = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${route.params.postID}`)
    if (response && response.data) {
      Object.assign(ArticleInDB, response.data);
      console.log('ArticleInDB:', ArticleInDB);
        }
  } catch (error) {
    console.error('데이터 가져오는 중 오류 발생', error)
  }
}

// 마운트 시 데이터 요청하여 가져오기
onMounted(() => {
  getArticle();
})

const commentText = ref("");
const displayLikes = computed(() => {
  return ArticleInDB.likes.length.toLocaleString("ko-KR");
});

const swiperParams = {
  slidesPerView: 1,
  spaceBetween: 24,
  navigation: {
    enabled: true,
    prevEl: ".slider-prev-el",
    nextEl: ".slider-next-el",
  },
  pagination: {
    enabled: true,
    type: "bullets",
    // dynamicBullets: true, // 이미지가 아주 많을 때, pagination bullet 컨테이너를 슬라이더처럼 작동시킴
    // dynamicMainBullets: 7,
    el: ".slider-pagination",
  },
};

// 좋아요 버튼 클릭 시 핸들러
const likeBtnHandler = async () => {
  const postId = thisArticle.id;  // 포스트를 작성한 유저 id
  const userId = 123456; // 임시 데이터, 유저 id로 변경 예정
  try {
    const response = await axios.post(`http://localhost:3000/posts/${postId}/like`, { userId});
    // console.log('좋아요 성공', response.data);
    if (response.data.message === '좋아요 추가 성공') {
            // 좋아요 추가된 경우
            ArticleInDB.likes.push(userId);
            console.log('좋아요 목록 업데이트:', ArticleInDB.likes);
        }else if (response.data.message === '좋아요 취소 성공') {
      // 좋아요 취소된 경우, ArticleInDB.likes 배열에서 유저 아이디 제거
      const index = ArticleInDB.likes.indexOf(userId);
      if (index > -1) {
        ArticleInDB.likes.splice(index, 1);
      }
      console.log('좋아요 목록 업데이트(취소):', ArticleInDB.likes);
    }
  }
  catch (error) {
    console.error('에러 발생', error.response ? error.response.data : error.message)
  }
  // 임시 데이터 사용 로직
  // thisArticle.likes.push(Math.floor(Math.random() * 1000000)); // 임시 데이터, 유저 id로 변경 예정
  // console.log(thisArticle.likes);
  // console.log("버튼 클릭");
};

// 댓글 등록 버튼 클릭 시 핸들러
const commentBtnHandler = (e) => {
  e.preventDefault();
  console.log(thisArticle.comments);
  thisArticle.comments.push({
    id: Math.floor(Math.random() * 1000000), // 임시 데이터
    userId: 1, // 임시 데이터, 유저 id로 변경 예정
    commentText: commentText.value,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
  });
  commentText.value = "";
};
console.log(thisArticle.comments);
</script>
<!-- Logic Ends -->

<style lang="scss" scoped></style>
<!-- Stylesheet Ends -->
