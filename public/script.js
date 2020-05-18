/** 
 *  get data from the API
*/
getAllPosts();
function getAllPosts() {
    //let url = "http://192.168.1.24:4000/api/get"
    let url = "https://rest-api-mural.herokuapp.com/api/get"
    fetch(url).
        then(res => {
            return res.json();
        }).then(data => {
            let postAll = "";
            

            for (let i = 0; i < data.length; i++) {   
                let post =
                    `<div id = ${data[i]._id} class="card rounded">

                   <div class="card-header bg-info">
                     <h5 class="card-title"><span class = "">Title</span>: ${data[i].title}</h5>
                   </div>

                   <div class = "border" >
                    <div class="card-body">
                     <div class="card-text mb-4"> 
                     <p class = "container">${data[i].descricao}</p></div>
                     </div>

                     <div class="btn float-right" role="group" aria-label="Basic example">
                     <button class="btn border text-danger bg-white" id = deletePost${data[i]._id}> Delete</button>
                     </div>
                     </div>
                  
                 </div>`


                postAll = postAll + post;
            }
            document.getElementById("posts").innerHTML = postAll;
        })
}

document.body.addEventListener('click', function (event) {
   //let url = "http://192.168.1.24:4000/api/get"
     let url = "https://rest-api-mural.herokuapp.com/api/get"
    fetch(url).
        then(res => {
            return res.json();
        }).then(data => {
            for (i = 0; i < data.length; i++) {
                if (event.srcElement.id == `deletePost${data[i]._id}`) {
               //     alert("Quer mesmo deletar este Post?")
                    document.getElementById(`${data[i]._id}`).remove();
                    deletePost(data[i]._id);
                };
            }
        })
    if (event.srcElement.id == "sendPost") {
   //     alert("Quer mesmo inserir o Post?")
        newPost();
    }
});

/** 
 * 
 * new Post bei Send Comment: route POST 
 * 
*/
function newPost() {
    let title = document.getElementById("title").value;
    let descricao = document.getElementById("description").value;

    post = { title, descricao }
    // let url_newpost = "http://192.168.1.24:4000/api/post";
    let  url_newpost = "https://rest-api-mural.herokuapp.com/api/post"
    let options = {
        method: "POST",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(post)
    };

    fetch(url_newpost, options).then(res => {
        getAllPosts();
        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
    })
}

/**
 * Delete a post
 */
function deletePost(postID) {
    //https://rest-api-mural.herokuapp.com/api/delete/
    //http://192.168.1.24:4000/api/delete/
    fetch("https://rest-api-mural.herokuapp.com/api/delete/" + postID, { method: "DELETE" }).then(res => {

        getAllPosts();

    })
}

