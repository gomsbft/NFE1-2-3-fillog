import { defineStore } from 'pinia';

export const useUserStore = defineStore('currentUser', {
    state: () => {
        return {
            userName: '홍길동'
        }
    },
    actions: {
        setUser(userObject) {
            this.userName = userObject.userName;
        }
    }
});

/**
 * 사용자 계정 정보
 */