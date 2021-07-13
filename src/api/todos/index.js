import { firebase } from '../firebase/config'
export const Todos = {
    addTodo: async(todo) => {
        const db = firebase.database()
        const todosref = db.ref().child('todos')
        const newTodoKey = await todosref.push().key;
        return new Promise((resolve, reject) => {
            const updates = {}
            updates['/todos/' + newTodoKey] = todo;
            db.ref().update(updates)
                .then(() => {
                    resolve(true)
                })
        })
    },
    removeTodo: (rmkey) => {
        return new Promise((resolve, reject) => {
            const db = firebase.database()
            const tref = db.ref("/todos/" + rmkey)
            tref.remove()
                .then(() => {
                    resolve(true)
                })
        })
    }
}