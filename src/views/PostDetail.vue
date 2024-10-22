<template>
    <article id="postDetail">
        <div id="postImageSlider" v-if="thisArticle.images.length > 0">
            <swiper-container v-bind="swiperParams">
                <swiper-slide class="article-image-slide" v-for="(imgItem, index) in thisArticle.images" :key="index">
                    <img class="article-image" :src="imgItem.imageURL" :alt="imgItem.alt">
                </swiper-slide>
            </swiper-container>

            <button type="button" class="slider-prev-el" title="이전 이미지">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-arrow-left-s-line"></use>
                </svg>
            </button>

            <button type="button" class="slider-next-el" title="다음 이미지">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-arrow-right-s-line"></use>
                </svg>
            </button>

            <div class="slider-pagination"></div>
        </div> <!-- #postImageSlider - 이미지가 존재할 때 -->

        <div id="postImageSlider" class="no-images" v-else></div> <!-- #postImageSlider - 이미지가 없을 때 -->

        <div id="postInformations">
            <p class="article-info-category">{{ postCategory[thisArticle.category] }}</p>

            <h1 id="postTitle">{{ thisArticle.title }}</h1> <!-- postTitle -->

            <div id="postSummaries">
                <UserNameTag :user-id="thisArticle.author.userId" />

                <span>·</span>

                <p class="article-info-date">{{ new Date(thisArticle.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}</p>

                <span>·</span>

                <p class="article-info-time">{{ thisArticle.time }}</p>

                <span>·</span>

                <p class="article-info-likes">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-fill"></use>
                    </svg>

                    <span>{{ thisArticle.likes.length.toLocaleString('ko-KR') }}</span>
                </p>
            </div> <!-- #postSummaries -->
        </div>  <!-- #postInformations -->

        <div id="articleText" v-dompurify-html="thisArticle.text"></div> <!-- #articleText -->

        <MediaInfo :media-object="null" />

        <div id="postControls">
            <button type="button" class="button-post-controls" title="좋아요" style="--button-icon-color: var(--clr-alert);">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-line"></use>
                </svg>

                <span>좋아요</span>
            </button>

            <button type="button" class="button-post-controls" title="미디어" style="--button-icon-color: var(--clr-clear);">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-movie-2-line"></use>
                </svg>

                <span>작품 정보</span>
            </button>

            <button type="button" class="button-post-controls" title="공유" style="--button-icon-color: var(--clr-warn);">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-share-2-line"></use>
                </svg>

                <span>공유</span>
            </button>
        </div> <!-- #postControls -->

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

                <p>댓글 <span>·</span> <span class="replies-counter">{{ thisArticle.comments.length.toLocaleString('ko-KR') }}</span></p>
            </div>

            <div id="repliesContainer" class="empty" v-if="thisArticle.comments.length === 0">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-chat-delete-line"></use>
                </svg>

                <p>아직 댓글이 없어요.</p>
            </div> <!-- #repliesContainer - 댓글이 없을 때 -->

            <div id="repliesContainer" v-else>
                <ArticleReply v-for="(commentItem, index) in thisArticle.comments" :key="index" :reply-object="commentItem" />
            </div> <!-- #repliesContainer - 댓글이 존재할 때 -->

            <div id="replyEditor">
                <div id="replyingUser">
                    <UserNameTag />
                </div> <!-- #replyingUser -->

                <div id="replyingInput">
                    <textarea name="reply-input" id="txtReply" rows="3" placeholder="댓글은 내 마음을 비추는 거울입니다. 나 자신과 상대방을 위한 배려와 책임을 담아 작성해 주세요."></textarea>

                    <button type="button" id="btnSubmitReply">
                        <svg class="remix">
                            <use xlink:href="/miscs/remixicon.symbol.svg#ri-corner-down-left-line"></use>
                        </svg>

                        <span>등록</span>
                    </button>
                </div> <!-- #replyingInput -->
            </div> <!-- #replyEditor -->
        </div> <!-- #postReplies -->

        <div>
            <button @click="router.go(-1)">뒤로</button>
        </div>
    </article> <!-- #postDetail -->
</template> <!-- Template Ends -->

<script setup>
    import { useRouter, useRoute } from 'vue-router';
    import postData from '../datas/postData.json'; // 임시 데이터
    import postCategory from '../datas/articleCategory.json'; // 임시 카테고리
    import MediaInfo from '../components/commons/MediaInfo.vue';
    import ArticleReply from '../components/ArticleReply.vue';

    const router = useRouter();
    const route = useRoute();
    const thisArticle = postData.find(item => item.id === parseInt(route.params.postID));

    const swiperParams = {
        slidesPerView: 1,
        spaceBetween: 24,
        navigation: {
            enabled: true,
            prevEl: '.slider-prev-el',
            nextEl: '.slider-next-el'
        },
        pagination: {
            enabled: true,
            type: 'bullets',
            // dynamicBullets: true, // 이미지가 아주 많을 때, pagination bullet 컨테이너를 슬라이더처럼 작동시킴
            // dynamicMainBullets: 7,
            el: '.slider-pagination'
        }
    }
</script> <!-- Logic Ends -->

<style lang="scss" scoped>

</style> <!-- Stylesheet Ends -->