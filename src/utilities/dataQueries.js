import baseAPI from './apiDefault';

export const login = async (userObject) => { // 로그인 - 미완성
    try {
        const { data: response } = await baseAPI.post('/login', userObject);

        return response;
    } catch(error) {
        return error;
    }
}

export const getAdminInfo = async () => { // 블로그 관리자 정보 가져오기
    try {
        const { data: response } = await baseAPI.get('/admin-info');

        return response;
    } catch(error) {
        console.error(error);
    }
};

export const getTotalUsers = async () => { // 전체 사용자 가져오기
    try {
        const { data: response } = await baseAPI.get('/users');

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const getUserInfo = async (userID) => { // 개별 사용자 정보 가져오기
    if (!!userID === false) return console.warn('dataQueries / getUserInfo Error : 사용자 ID 형식이 잘못되었거나 존재하지 않는 ID입니다.');

    try {
        const { data: response } = await baseAPI.get(`/user-info/${ userID }`);

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const writePost = async (articleData, forwardFunction) => { // 포스트 작성
    try {
        const response = await baseAPI.post('/post', articleData);

        if (response.status === 200) {
            alert('게시물이 등록되었습니다.');

            forwardFunction();
        }
    } catch(error) {
        console.error(error);
    }
}

export const getTotalPosts = async () => { // 포스트 목록 가져오기
    try {
        const { data: response } = await baseAPI.get('/posts');

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const getPostInfo = async (articleID) => { // 개별 포스트 가져오기
    try {
        const { data: response } = await baseAPI.get(`/posts/${ articleID }`);

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const editPost = (postID) => { // 게시물 수정
    router.push(`/posts/edit/${ postID }`);
};

export const deletePost = async (postID) => { // 게시물 삭제
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

export const getMovieInfo = async (movieID) => { // 특정 ID의 영화 정보 가져오기
    try {
        const { data: response } = await baseAPI({
            method: 'get',
            url: `https://api.themoviedb.org/3/movie/${ movieID }`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            params: {
                api_key: import.meta.env.VITE_MOVIE_API_KEY, // 수정 필요 - .local 파일로 변경하여 커밋되지 않도록 해야 함
                language: 'ko-KR',
                append_to_response: 'videos,images,credits'
            },
            responseType: 'json'
        });

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const movieCategories = async () => { // 영화 카테고리 정보 가져오기
    try {
        const { data: response } = await baseAPI({
            method: 'get',
            url: 'https://api.themoviedb.org/3/genre/movie/list',
            header: { 'X-Requested-With': 'XMLHttpRequest' },
            params: {
                api_key: import.meta.env.VITE_MOVIE_API_KEY, // 수정 필요 - .local 파일로 변경하여 커밋되지 않도록 해야 함
                language: 'ko-KR'
            },
            responseType: 'json'
        });

        return response.genres;
    } catch(error) {
        console.log(error);
    }
}

export const searchMovies = async (searchQuery) => { // 영화 정보 검색
    try {
        const { data: response } = await baseAPI({
            method: 'get',
            url: `https://api.themoviedb.org/3/search/movie?query=${ searchQuery }&include_adult=true&language=ko-KR`,
            header: { 'X-Requested-With': 'XMLHttpRequest' },
            params: {
                api_key: import.meta.env.VITE_MOVIE_API_KEY, // 수정 필요 - .local 파일로 변경하여 커밋되지 않도록 해야 함
                language: 'ko-KR',
                append_to_response: 'images,credits'
            },
            responseType: 'json'
        });

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const writeReply = async (articleID, replyObject) => {
    try {
        const response = await baseAPI.post(`/posts/${ articleID }/comment`, replyObject);
        // 서버 응답 처리
        if (response.status === 200) {
            console.log(response.data.message);

            return response;
        } else {
            console.error(response.data.message);
        }
    } catch(error) {
        console.error('댓글 등록 중 오류 발생 :', error);
    }
}

export const getArticleRepliesAll = async (articleID) => { // 포스트에 해당되는 전체 댓글 가져오기
    try {
        const { data: response } = await baseAPI.get(`/replies/post/${ articleID }`);

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const getArticleReplies = async (replyID) => { // 포스트의 개별 댓글 가져오기
    try {
        const { data: response } = await baseAPI.get(`/replies/${ replyID }`);

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const writeGuestbook = async (guestbookObj, forwardFunction) => { // 방명록 작성
    try {
        const response = await baseAPI.post('/guestbooks/write', guestbookObj);

        if (response.status === 200) alert('방명록 작성 완료');
    } catch(error) {
        console.error(error);
    } finally {
        forwardFunction;
    }
}

export const getTotalGuestbooks = async () => { // 전체 방명록 글 가져오기
    try {
        const { data: response } = await baseAPI.get('/guestbooks');

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const getGuestbookInfo = async (guestbookID) => { // 개별 방명록 글 가져오기
    try {
        const { data: response } = await baseAPI.get(`/guestbooks/${ guestbookID }`);

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const deleteGuestbook = async (guestbookID) => { // 방명록 글 삭제
    const areYouSure = confirm('이 방명록 글을 삭제하시겠어요?');

    if (!areYouSure) return;

    try {
        await baseAPI.delete(`/guestbooks/${ guestbookID }`);

        alert('방명록 삭제 완료');
    } catch(error) {
        console.error(error);
    }
}

export const writeGuestbookReply = async (guestbookID, replyObject, forwardFunction) => { // 방명록 답글 작성
    try {
        const response = await baseAPI.post(`/guestbooks/reply/${ guestbookID }`, replyObject);

        if (response.status === 200) alert('답글 작성 완료');
    } catch(error) {
        console.error(error);
    } finally {
        forwardFunction;
    }
}

export const getGuestbookReplies = async (guestbookID) => { // 방명록 글의 전체 답글 가져오기
    try {
        const { data: response } = await baseAPI.get(`/guestbooks/replies/${ guestbookID }`);

        return response;
    } catch(error) {
        console.error(error);
    }
}