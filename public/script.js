/** 
 *  get data from the API
*/
getAllPosts();
function getAllPosts() {
    let url = "http://192.168.1.24:4000/api/get"
    fetch(url).
        then(res => {
            return res.json();
        }).then(data => {
            let postAll = "";

            for (let i = 0; i < data.length; i++) {

                let post = `<div id = ${data[i]._id} class="card mb-5">

                   <div class="card-header bg-info">
                     <h5 class="card-title">${data[i].title}</h5>
                   </div>

                    <div class="card-body">
                     <div class="card-text mb-4"> ${data[i].descricao}
                     </div>
                     </div>
                     <button class="bg-danger" id = deletePost${data[i]._id}> Delete</button>

                 </div>`

                postAll = postAll + post;
            }

            document.getElementById("posts").innerHTML = postAll;

        })
}



document.body.addEventListener('click', function (event) {
    let url = "http://192.168.1.24:4000/api/get"
    fetch(url).
        then(res => {
            return res.json();
        }).then(data => {
            for (i = 0; i < data.length; i++) {

                if (event.srcElement.id == `deletePost${data[i]._id}`) {
                    alert("Quer mesmo deletar este Post?")
                    document.getElementById(`${data[i]._id}`).remove();
                    deletePost(data[i]._id);
                };
            }
        })

    if (event.srcElement.id == "sendPost") {
        alert("Quer mesmo inserir o Post?")
        newPost();
    }
});


/**
 * Delete a post
 */
function deletePost(postID) {
    //let postID = "5eb42a26f2c41e5b0f536428";
    fetch("http://192.168.1.24:4000/api/delete/" + postID, { method: "DELETE" }).then(res => {

        getAllPosts();

    })
}


/** 
 * 
 * new Post bei Send Comment: route POST 
 * 
*/
function newPost() {
    let title = document.getElementById("title").value;
    let descricao = document.getElementById("description").value;

    post = { title, descricao }

    let url_newpost = "http://192.168.1.24:4000/api/post";
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












/** let postAll = "";
 for (let i = 0; i < data.length; i++) {

     let post = `
<div id = ${data[i]._id} class="content">
   <div class="card mb-5">

       <div class="card-header bg-info">
         <h5 class="card-title">${data[i].title}</h5>
       </div>


      <div class="card-body">
         <div class="card-text mb-4"> ${data[i].descricao}
         </div>

         <button class="bg-danger" id="deltePost"> Delete</button>

     </div>`

     postAll = postAll + post;
 }
 document.getElementById("content").innerHTML = postAll;
 */


/**
 *
 let title = document.createElement("h5");
 title.classList.add("card-title");
 title.innerHTML = data[i].title;

 let div_header = document.createElement("div");
 div_header.classList.add("card-header", "bg-info");

 div_header.appendChild(title);


let card_text = document.createElement("div");
card_text.classList.add("card-text", "mb-4");
card_text.innerHTML = data[i].descricao;

let card_body = document.createElement("div");
card_body.classList.add("card-body");

card_body.appendChild(card_text);


let card = document.createElement("div");
card.classList.add("card", "mb-5");


let deleteBtn = document.createElement("button");
deleteBtn.classList.add("bg-danger");
deleteBtn.innerHTML = "Delete";
deleteBtn.id = `btn${data[i]._id}`;



card.appendChild(div_header);
card.appendChild(card_body);
card.appendChild(deleteBtn);


document.getElementsByClassName("content")[0].id = `content${data[i]._id}`;
document.getElementsByClassName("content")[0].appendChild(card);
*/