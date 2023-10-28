import { Requests } from "../actions/index.js";
import { navigateTo } from "../routs/router.js";

async function createPostsForDom(posts, root, users) {
    let userData = await users;
    let html = ""
    if (posts.length === 0) {
        return root.innerHTML += "<div class='text-center color-red pt-1'>Postes not found </div> "
    }
    posts.forEach((post, i) => {
        let user = userData.find(user => user.id === post.userId);
        if (i % 2 === 0) {
            html += `
                    <div class="p-2 mt-1 ">
                        <div class="postContainer ">
                            <div class="postsData">
                                ${post.id}
                            </div>
                            <div class="postsData">
                                ${user ? user.username : "user not found "}
                            </div>
                            <div class="postsData">
                                ${post.title}
                            </div>
                            <div class="flex gap-8 jc-center">
                                <img src="../images/edit.png" alt="${post.id}" class="editPost"/>
                                <img src="../images/deletePost.png" alt="${post.id}" class="deletePost"/>
                            </div>
                        </div>
                    </div>
                
                `
        } else {
            html += `

                    <div class="p-2  mt-1 bg-dark">
                        <div class="postContainer">
                            <div>
                                ${post.id}
                            </div>
                            <div>
                                ${user ? user.username : "user not found "}
                            </div>
                            <div class="''">
                                ${post.title}
                            </div>
                            <div class="flex gap-8 jc-center delEditContainer">
                                <img src="../images/edit.png" alt="${post.id}" class="editPost"/>
                                <img src="../images/deletePost.png" alt="${post.id}" class="deletePost"/>
                            </div>
                        </div>
                    </div>
                
                `
        }
    })
    root.innerHTML += html
}



export function renderPostesForDom(root, users) {
    return Requests.getMyPosts("https://jsonplaceholder.typicode.com/posts")
        .catch((e) => {
            console.log(111);
            root.innerHTML += e.message
        })
        .then(async (data) => {
            root.innerHTML = ""
            let titlePosts = document.querySelector("#titlePosts");
            let titleRoot = document.querySelector("#titleRoot");
            if (!(titlePosts && titleRoot)) {
                root.innerHTML += `
                    <div class="flex between align-center" id="titleRoot">
                        <h2>Posts</h2>
                        <button class="createButton" 
                            onClick=""
                        >Create</button>
                    </div>
                    <div class="p-2 bg-dark mt-1" id="titlePosts">
                        <div class="postContainer text-center ">
                            <div>
                                #
                            </div>
                            <div>
                                User Name
                            </div>
                            <div>
                                Title
                            </div>
                            <div class="text-center">
                                Actions
                            </div>
                    </div>
                `
            }
            document.querySelector(".createButton").addEventListener("click", () => navigateTo("create"))
            await createPostsForDom(data, root, users)
        })
}
