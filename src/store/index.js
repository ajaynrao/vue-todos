import { createStore } from 'vuex';
const Store = createStore({
    state() {
        return {
            user: null
        }
    },
    mutations: {
        updateUser(state, user) {
            state.user = user
        }
    },
    getters: {
        isAuthenticated: state => !!state.user
    }
})
export default Store