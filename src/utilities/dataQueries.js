import axios from 'axios';

export const getPostInfo = async (articleID) => {
    try {
        const response = await axios.get(apiURL, {
            // get option
        });

        return response;
    } catch(error) {
        // 에러 출력 Utility 컴포넌트
        console.error(error);
    }
}