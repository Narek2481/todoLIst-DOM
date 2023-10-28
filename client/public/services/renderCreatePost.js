import { Requests } from "../actions/index.js";
import { navigateTo } from "../routs/router.js";

export async function createPostPageCreater(root) {
    await Requests.getMyPosts("https://jsonplaceholder.typicode.com/users")
        .then((data) => {
            console.log(data);
            let options = data.map((elem) => {
                return `<option value="${elem.id}">${elem.name}</option>`
            }).join(",")
            let html = `
                <h2>Create Post</h2>
                <div class="flex between">
                    <div class="p-2 w-50" >
                        <input value="" class="block w-100 p-1 titleInput mb-2" placeholder="Title" />
                        <select  class="selectCreate w-100 mt-1" ">
                            <option>Select User</option>
                            ${options}
                        </select>
                    </div>
                    <div class="p-2 w-50">
                        <input class="bodyInput w-100 p-1 flex align-center" value="" placeholder="Body"  />
                    </div>
                </div>
                <div class="mt-3 text-right pt-2 mt-1 ">
                   <div class="flex jc-center gap-20 w-25 ml-auto pt-2 mt-1 ">
                        <button id="createRequest">Create</button>
                        <button id="createCancel">Cancel</button>
                   </div>
                </div>
            `
            root.innerHTML = html;
        })
        .then(() => {
            //  Create request designed for  eventes
            const createBody = {};
            const resultElement = document.querySelector('select');
            const titleInput = document.querySelector(".titleInput");
            const bodyInput = document.querySelector(".bodyInput");
            const createRequest = document.querySelector("#createRequest");
            const createCancel = document.querySelector("#createCancel");
            resultElement.addEventListener("change", (e) => {
                createBody.userId = e.target.value;
            })
            titleInput.addEventListener("change", (e) => {
                createBody.title = e.target.value;
            })
            bodyInput.addEventListener("change", (e) => {
                createBody.body = e.target.value;
            })
            createRequest.addEventListener("click", async () => {
                await Requests.postPosts('https://jsonplaceholder.typicode.com/posts', createBody)
                    .catch(e => {
                        throw e
                    })
                    .then((json) => {
                        console.log(json)
                        navigateTo("posts");
                    });
            })

            createCancel.addEventListener("click", () => {
                navigateTo("posts");
            })
        })
}