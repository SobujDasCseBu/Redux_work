const store = require("./app/strore");
const fetch = require('node-fetch')
const {fetchPosts } = require('./features/post/postSlice')

//initialState
//console.log(store.getState())

var count = true;
// subscribe to state changes
store.subscribe( () => {
    const result = store.getState()

    //console.log("Data >>>:  ",result)
    

    if(result.post.posts.id && count ){
        //console.log("The post is :>>>>>  ",result.post.posts)
        count = false

        const text = result.post.posts.title
        const titleArray = text.split(" ")
       
        var length = titleArray.length

        //console.log("title >>", length)
        var newStr = ''

        titleArray.map((title) =>{
         length--;
         newStr += `title_like=${title}`
         if(length){
            newStr +='&'
         }
         //console.log("Title ...",title)
        })

       

       const relatedPostUrl = `https://jsonplaceholder.typicode.com/posts?${newStr}`

       console.log('relatedPostUrl   >>', relatedPostUrl)

    // dispatch related post url
   if(relatedPostUrl){
      
      store.dispatch(fetchPosts(relatedPostUrl))
   }

    }
   
});

// creating a random post url

const randomNumber = Math.floor(Math.random() * 100)
 const initialUrl =  `https://jsonplaceholder.typicode.com/posts/${randomNumber}`

// disptach a random post url

store.dispatch(fetchPosts(initialUrl));
