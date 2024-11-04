<template>
    <article id="postDetail" v-if="thisArticle">
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
            <p class="article-info-category">{{ articleCategory[thisArticle.category] }}</p>

            <h1 id="postTitle">{{ thisArticle.title }}</h1> <!-- postTitle -->

            <div id="postSummaries">
                <UserNameTag :user-id="thisArticle.author" />

                <span>·</span>

                <p class="article-info-date">{{ dateFormat(thisArticle.createdAt) }}</p>

                <span>·</span>

                <p class="article-info-time">{{ hourFormat(thisArticle.createdAt) }}</p>

                <span>·</span>

                <p class="article-info-likes">
                    <svg class="remix">
                        <use xlink:href="/miscs/remixicon.symbol.svg#ri-heart-fill"></use>
                    </svg>

                    <span>{{ displayLikes }}</span>
                </p>
            </div> <!-- #postSummaries -->
        </div>  <!-- #postInformations -->

        <div id="articleText" v-dompurify-html="thisArticle.text"></div> <!-- #articleText -->

        <MediaInfo v-if="!!thisArticle.movieID === true" :movie-id="thisArticle.movieID" />

        <div id="postControls">
            <button type="button" class="button-post-controls" title="좋아요" style="--button-icon-color: var(--clr-alert);" @click="likeBtnHandler">
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

            <!-- 이 버튼들은 자기가 쓴 게시물에만 표시 -->
            <button type="button" class="button-post-controls" title="수정" style="--button-icon-color: var(--clr-info)" @click="router.push(`/posts/edit/${ thisArticle.id }`)">
                <svg class="remix"mlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.41421 15.89L16.5563 5.74785L15.1421 4.33363L5 14.4758V15.89H6.41421ZM7.24264 17.89H3V13.6473L14.435 2.21231C14.8256 1.82179 15.4587 1.82179 15.8492 2.21231L18.6777 5.04074C19.0682 5.43126 19.0682 6.06443 18.6777 6.45495L7.24264 17.89ZM3 19.89H21V21.89H3V19.89Z"></path>
                </svg>

                <span>수정</span>
            </button>

            <button type="button" class="button-post-controls" title="삭제" style="--button-icon-color: var(--clr-alert)" @click="deleteArticle(thisArticle.id)">
                <svg class="remix"mlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path>
                </svg>

                <span>삭제</span>
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

                <p>댓글 <span>·</span> <span class="replies-counter">{{ thisReplies.length.toLocaleString('ko-KR') }}</span></p>
            </div>

            <div id="repliesContainer" class="empty" v-if="thisArticle.comments.length === 0">
                <svg class="remix">
                    <use xlink:href="/miscs/remixicon.symbol.svg#ri-chat-delete-line"></use>
                </svg>

                <p>아직 댓글이 없어요.</p>
            </div> <!-- #repliesContainer - 댓글이 없을 때 -->

            <div id="repliesContainer" v-else>
                <ArticleReply v-for="(commentID, index) in thisArticle.comments" :key="index" :reply-id="commentID">
                    <ArticleReply v-for="(reReplies, index) in thisArticle.comments" :key="index" :reply-id="reReplies" />
                </ArticleReply>
            </div> <!-- #repliesContainer - 댓글이 존재할 때 -->

            <div id="replyEditor">
                <div v-if="userStore.state.account" id="replyingUser">
                    <UserNameTag :userId="userStore.state.userId" />
                </div> <!-- #replyingUser - 사용자가 로그인 된 상태일 때 -->

                <div v-else id="replyingUser">
                    <div class="replying-unknown-user">
                        <svg class="remix">
                            <use xlink:href="/miscs/remixicon.symbol.svg#ri-user-fill"></use>
                        </svg>
                    </div>

                    <input type="text" name="replying-name" id="txtReplyingName" minlength="2" maxlength="12" placeholder="별명">
                    <input type="password" name="replying-password" id="txtReplyingPassword" minlength="8" maxlength="16" placeholder="비밀번호">
                </div> <!-- #replyingUser - 사용자가 로그인하지 않았을 때 -->

                <div id="replyingInput">
                    <textarea v-model="commentText" name="reply-input" id="txtReply" rows="3" placeholder="댓글은 내 마음을 비추는 거울입니다. 나 자신과 상대방을 위한 배려와 책임을 담아 작성해 주세요."></textarea>

                    <button type="button" id="btnSubmitReply" @click="commentBtnHandler">
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
    import { ref, computed, reactive } from 'vue';
    import { useRouter, useRoute } from 'vue-router';
    import axios from 'axios';
    import { getPostInfo, getArticleRepliesAll, getReplyReplies } from '../utilities/dataQueries';
    import dateFormat from '../utilities/dateFormat';
    import hourFormat from '../utilities/hourFormat';
    import articleCategory from '../datas/articleCategory.json'; // 임시 카테고리
    import MediaInfo from '../components/commons/MediaInfo.vue';

    const router = useRouter();
    const route = useRoute();
    const thisArticle = await getPostInfo(route.params.postID);
    const thisReplies = await getArticleRepliesAll(thisArticle._id);
    const postData = reactive({
        likes: [...thisArticle.likes], 
        comments: [...thisArticle.comments], 
    });
    const displayLikes = computed(() => { return postData.likes.length.toLocaleString('ko-KR') });
    const commentText = ref('');
    const tempUserID = null; // 임시 사용자 ID - 이후에는 로그인 사용자 스토어에서 가지고 와야 함
    const userStore = useUserStore();  // userInfo 스토어 사용
    console.log("postData.comments:", postData.comments)
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

    // 게시물 삭제
    const deleteArticle = async () => {
        const postID = route.params.postID;
        const confirmDel = confirm('이 게시물을 정말 삭제하시겠습니까?');

        if (confirmDel) {
            try {
                await axios.delete(`http://localhost:3000/posts/${ postID }`);

                alert('게시물이 삭제되었습니다.');
                router.push('/posts');
            } catch(error) {
                alert('게시물 삭제에 실패했습니다.');
                console.error(error);
            }
        }
    }

    // 좋아요 버튼 클릭 시 핸들러
    const likeBtnHandler = async () => {
        const postId = thisArticle.id;  
        const userId = userStore.state.userId;// 로그인한 사용자의 ObjectId
        console.log("userId: ",userId)

        try {
            const response = await axios.post(`http://localhost:3000/posts/${ postId }/like`, { userId });

            if (response.data.message === '좋아요 추가 성공') {
                // 좋아요 추가된 경우
                if (!postData.likes.includes(userId)) {
                postData.likes.push(userId);
                console.log('좋아요 목록 업데이트:', postData.likes);
                }
            } else if (response.data.message === '좋아요 취소 성공') { 
                // 좋아요 취소된 경우, postData.likes 배열에서 유저 아이디 제거
                const index = postData.likes.indexOf(userId);

                if (index > -1) {
                    postData.likes.splice(index, 1);
                }

                console.log('좋아요 목록 업데이트(취소):', thisArticle.likes);
            }
        } catch(error) {
            console.error('에러 발생', error.response ? error.response.data : error.message)
        }
    }

    // 댓글 등록 버튼 클릭 시 핸들러
    const commentBtnHandler = async (e) => {
        e.preventDefault();
        const postObjId = thisArticle._id;
        const postId = thisArticle.id;
        console.log("postObjId: ",postObjId)
        console.log("thisArticle.comments: ",thisArticle.comments);

        if (!commentText.value) {
            commentText.value = '';
            return console.log('댓글 내용 없음');
        }

        const newComment = {
            userId: userStore.state.account, 
            commentText: commentText.value,
            date: new Date().toLocaleDateString(), // 현재 날짜
            time: new Date().toLocaleTimeString(), // 현재 시간
            postId: postId,
        };
        
        try {
            console.log(`이곳으로 댓글을 보냄: /posts/${postObjId}/comment`);
            console.log('댓글 데이터:', newComment);
            const response = await axios.post(`http://localhost:3000/posts/${postObjId}/comment`, newComment);

            // 서버 응답 처리
            if (response.status === 200) {
                console.log(response.data.message);
                console.log('서버에서 받은 댓글:', response.data.comment);
                postData.comments.push({...newComment}); 
            } else {
                console.error(response.data.message); 
            }
        } catch (error) {
            console.error('댓글 등록 중 오류 발생:', error); 
        } finally {
            // 댓글 입력 필드 초기화
            commentText.value = '';
            console.log("postData.comments: ", postData.comments)
        }
    }
</script> <!-- Logic Ends -->