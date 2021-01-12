import axios from 'axios'

import {ADD_POST, GET_ERRORS, GET_POSTS,POST_LOADING, DELETE_POST,GET_POST,CLEAR_ERRORS} from './types'

// Add Posts
export const addPost = (postData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post('/posts',postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}

//Get Posts
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    axios
        .get('/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POSTS,
            payload: null
        }))
}

//Get Post
export const getPost = (id) => dispatch => {
    dispatch(setPostLoading());
    axios
        .get(`/posts/${id}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_POST,
            payload: null
        }))
}

//Delete Post
export const deletePost = (postId) => dispatch => {
    axios
        .delete(`/posts/${postId}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: postId
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}

//Add Like 
export const addLike = (postId) => dispatch => {
    axios
        .get(`/posts/${postId}/like`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}

//Add Comment
export const addComment = (postId,commentData) => dispatch => {
    dispatch(clearErrors());
    axios
        .post(`/posts/${postId}/comments`,commentData)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}

//Delete Comment
export const deleteComment = (postId,commentId) => dispatch => {
    axios
        .delete(`/posts/${postId}/comments/${commentId}`)
        .then(res => dispatch({
            type: GET_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}

//Set Loading State
export const setPostLoading = () => {
    return{
        type: POST_LOADING
    }
}

//Clear Erros
export const clearErrors = () => {
    return{
        type: CLEAR_ERRORS
    }
}