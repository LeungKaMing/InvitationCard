import * as Type from './mutaion-types.js'

// action交给store.dispatch来触发
export function add (text = 'add done') {
    return {
        type: Type.ADD_TODO,
        text
    }
}

export function remove (text = 'remove done') {
    return {
        type: Type.REMOVE_TODO,
        text
    }
}