/***************************index.html*************************************** */

function show() {
    let items = document.getElementById('items')
    

   fetch('data.json')
   .then(data => data.json())
   .then(data => {
        data.map(item => {
            items.innerHTML += `
              <div class="item">
             <div class="item-img">
                 <img src="./img/${item.image}" alt="img">
             </div>
             <div class="item-info">
                 <p class="title">
                   ${item.title}
                 </p>
                 <p class="body">
                    ${item.body.substring(0,70)}...<span style="color:grey;">(click to read all)</>
                 </p>
                 <a class="btn" href="post.html#${item.id}" onclick="post()">About It </a>
             </div>
         </div>
             `
        })

    })
}
    



/*************************Post.html******************************************** */

function showPost() {
    let hash = location.hash
    let id = hash.slice(1)
    postContainer = document.getElementById('post_container')


    fetch('data.json')
    .then(data => data.json())
    .then(data =>{
        data.map(item => {
            if (item.id == id) {
                postContainer.innerHTML += `
             <div class="post">
            <div class="post-img">
            <img src="./img/${item.image}" alt="">
            </div>
        
        <div class="post-info">
        <p class="title">${item.title}</p>
        <p class="body">${item.body}</p>
    </div>
</div>
            `
            }
        })

    
})
}
show()
showPost()


/***************************Search*********************************** */

let searchResult = document.getElementById('searchResult')



function showSearch(){
    searchResult.classList.toggle('show')
}

let i;

function searchShow() {
    searchResult.classList.add('show')
    let searchValue = document.getElementById("search").value
    if(searchValue.length == 0){
        i = 0
    }else{
        i = searchValue.length - 1
    }
    searchResult.innerHTML = ''

   fetch('data.json')
   .then(data => data.json())
   .then(data =>{

        data.map(item => {

            if (item.title[i].includes(searchValue[i]) == true && item.title.includes(searchValue)) {
                console.log(i)
                searchResult.innerHTML += `
                 <div class="result">
                    <img src="./img/${item.image}" alt="image">
                    <p>${item.title.substring(0,8)}...</p>
                    <a href="post.html#${item.id}" class="btn">about</a>
                </div> 
                `
            }

            
        })

        if(searchValue === ''){
            searchResult.innerHTML = 'Results not found'
            i = 0
        }

        i++
    })
    }



    /****************************Search Word******************************* */

    function mark(val){
        let searchValue = val.value
        let  items = document.getElementById('items')
        items.innerHTML ="";

       fetch('data.json')
       .then(data => data.json())
       .then(data =>{
             data.map(item =>{
                 items.innerHTML +=`
                 <div class="item">
                 <div class="item-img">
                     <img src="./img/${item.image}" alt="img">
                 </div>
                 <div class="item-info">
                     <p class="title">
                       ${highLiter(searchValue,item.title)}
                     </p>
                     <p class="body">
                        ${highLiter(searchValue,item.body.substring(0,70))}...<span style="color:grey;">(click to read all)</>
                     </p>
                     <a class="btn" href="post.html#${item.id}" onclick="post()">About It </a>
                 </div>
             </div>
                 `
                 
                
            

       })

    })
}

function highLiter(symbol,str){
    return str.replaceAll(symbol,`<mark>${symbol}</mark>`)
}