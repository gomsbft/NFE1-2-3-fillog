import baseAPI from './apiDefault';

export const getBlogInfo = async (blogID) => { // 블로그 기본 정보 가져오기
    try {
        const { data: response } = await baseAPI.get('/blogInfo', blogID);

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const getTotalUsers = async () => { // 전체 사용자 가져오기
    try {
        const { data: response } = await baseAPI.get('/users');

        return response;
    } catch(error) {
        console.error(error);
    }
}

export const getUserInfo = async (userID) => { // 개별 사용자 정보 가져오기
    try {
        const { data: response } = await baseAPI.get('/userInfo', userID);

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
        const { data: response } = await baseAPI.get(`/post/${ articleID }`);

        return response;
    } catch(error) {
        // 에러 출력 Utility 컴포넌트
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

export const movieCategories = async () => {
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

export const writeGuestbook = async (guestbookObj) => { // 방명록 작성
    try {
        const response = await baseAPI.post('/guestbooks/write', guestbookObj);

        if (response.status === 200) return alert('방명록 작성 완료');
    } catch(error) {
        console.error(error);
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