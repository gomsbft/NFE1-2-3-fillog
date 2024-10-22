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

export const getMovieInfo = async (movieID) => {
    try {
        const { data: response } = await baseAPI({
            method: 'get',
            url: `https://api.themoviedb.org/3/movie/${ movieID }`,
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            params: {
                api_key: import.meta.env.VITE_MOVIE_API_KEY,
                language: 'ko-KR',
                append_to_response: 'videos,images'
            },
            responseType: 'json'
        });

        return response;
    } catch(error) {
        console.error(error);
    }
}