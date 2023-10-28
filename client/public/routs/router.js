import { Requests } from "../actions/index.js";
import { renderDelete } from "../services/deletePosts.js";
import { createPostPageCreater } from "../services/renderCreatePost.js";
import { renderEditPosts } from "../services/renderEditPosts.js";
import { renderPostesForDom } from "../services/renderPosts.js"


const root = document.querySelector(".root");
const ul = document.querySelector(".rootNav");


export async function navigateTo(page, userId) {
    let deleteId = ""
    let users = Requests.getMyPosts("https://jsonplaceholder.typicode.com/users");
    if (page === "posts") {
        // events for  posts page 
        await renderPostesForDom(root, users)
            .then(async () => {
                root.style.height = ul.offsetHeight + "px";
                renderDelete(root);
                const deleteContainerBlack = document.querySelector(".deleteContainerBlack")
                document.querySelector("#deleteAcsess").addEventListener("click", async (e) => {
                    await Requests.deletePosts('https://jsonplaceholder.typicode.com/posts', deleteId)
                        .then((data) => {
                            console.log(data);
                            deleteContainerBlack.classList.add("none")
                        })
                })
                
                document.querySelectorAll(".deletePost").forEach(element => {
                    element.addEventListener("click", () => {
                        deleteId = element.getAttribute("alt");
                        console.log(element.getAttribute("alt"));
                        
                        deleteContainerBlack.classList.remove("none")
                        deleteContainerBlack.addEventListener("click", (e) => {
                            console.log(e.target.classList.contains("deleteContainerBlack"));
                            if (e.target.classList.contains("deleteContainerBlack")) {
                                deleteContainerBlack.classList.add("none");
                            }
                        })
                        document.querySelector("#closeDelete").addEventListener("click", () => {
                            // document.querySelector("#deleteAcsess").removeEventListener("click");
                            deleteContainerBlack.classList.add("none")
                        })
                    })
                })
            })
            .then(() => {
                // console.log(ediitRedirect);
                let i = 0;
                document.querySelectorAll(".editPost").forEach((elem) => {
                    let id = Number(elem.getAttribute("alt"))
                    elem.addEventListener("click", () => {
                        navigateTo("edit?id=" + id, id)
                    })
                    console.log(elem.parentElement.parentElement.children[0]);
                    elem.parentElement.parentElement.children[0].addEventListener("click", () => {
                        navigateTo("edit?id=" + id, id)
                    })
                    elem.parentElement.parentElement.children[1].addEventListener("click", () => {
                        navigateTo("edit?id=" + id, id)
                    })
                    elem.parentElement.parentElement.children[2].addEventListener("click", () => {
                        navigateTo("edit?id=" + id, id)
                    })
                })
                document.querySelector(".createButton")?.addEventListener("click", () => navigateTo("create"))
                
            })
        window.history.pushState({ page }, '', 'posts');
    } else if (page === "create") {
        root.style.height = "500px"
        await createPostPageCreater(root, users)
        window.history.pushState({ page }, '', 'create');
    } else if (page.indexOf("edit") >= 0) {
        console.log(page);
        window.history.pushState({ page }, '', page);
        // localStorage.setItem("pathEdit", page)
        root.style.height = "500px"
        await renderEditPosts(root, userId)
        // window.history.pushState({ page }, '', page);
    }
}
