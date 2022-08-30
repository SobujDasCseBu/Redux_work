const {createSlice, createAsyncThunk} = require('@reduxjs/toolkit')
//import fetch from 'node-fetch';
const fetch = require('node-fetch')

//initial state

const initialState = {
    loading:false,
    posts:[],
    error:''
}

// create async thunk 



const fetchPosts = createAsyncThunk('post/featchPosts', async (url)=>{
    //console.log("Get url  >>>>>", url)
    const response = await fetch(`${url}`)

    const posts = await response.json()

    return posts
})


const postSlice = createSlice({
    name:'post',
    initialState,
    extraReducers: (builder) =>{

        builder.addCase(fetchPosts.pending, (state, action) =>{

            state.loading = true,
            state.error = '',
            state.posts = []

        })
        builder.addCase(fetchPosts.fulfilled, (state, action) =>{

            state.loading = false,
            state.error = '',
            state.posts = action.payload

        })
        builder.addCase(fetchPosts.rejected, (state, action) =>{

            state.loading = false,
            state.error = action.error.message
            state.posts = []

        })

    }
})

module.exports = postSlice.reducer
module.exports.fetchPosts = fetchPosts