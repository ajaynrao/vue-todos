import { onMounted, ref, watch } from 'vue';
import { firebase } from '../api/firebase/config'
export function getUserTodos(user) {
    const todos = ref([])
    var cuser = user
    const getTodos = async() => {
        let db = firebase.database();
        let todosref = db.ref('todos')
        if (cuser.value) {
            todosref.orderByChild("uid").equalTo(cuser.value.uid).on("value", async function(snapshot) {
                console.log("get todos", snapshot.val());
                todos.value = await snapshot.val()
            });
        }
    }
    onMounted(getTodos)
    watch(user, getTodos)
    return {
        todos,
        getTodos
    }
}