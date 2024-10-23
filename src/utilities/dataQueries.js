import baseAPI from './apiDefault';

export const getPostInfo = async (articleID) => { // 개별 포스트 가져오기
    try {
        const { data: response } = await baseAPI.get(`/post/${ articleID }`, {
            // get option
        });

        return response;
    } catch(error) {
        // 에러 출력 Utility 컴포넌트
        console.error(error);
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