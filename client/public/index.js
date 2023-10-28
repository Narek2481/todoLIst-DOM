import { Requests } from "./actions/index.js"
import { readJson } from "./paint-data-json/nav.js"
import { navigateTo } from "./routs/router.js";

// dom variables ------------------------------------------------------------------------------------------------------

const ul = document.querySelector(".rootNav");

// router ------------------------------------------------------------------------------------------------------------

window.onpopstate = async function (event) {
    if (event.state) {
        // console.log(page);
        const page = event.state.page;
        await getStaticContent(page);
    }
};

// Window.navigation = () =>console.log(window);

async function getStaticContent(page) {
    console.log("getStaticContent");
    if (page === 'posts') {
        navigateTo(page)
    } else if (page === 'create') {
        navigateTo(page, "getStaticContent")
    } else if (page.indexOf("edit") >= 0) {
        console.log(page);
        navigateTo(page)
    } else if (page === 'delete') {
        navigateTo(page)
    }
}

const path = window.location.pathname.substr(1);
if (path === 'create' || path === 'posts' || path === 'delete' || path.indexOf("edit") >= 0) {
    if (path.indexOf("edit") >= 0) {
        navigateTo(localStorage.getItem("pathEdit") ? localStorage.getItem("pathEdit") : path)
    } else {
        navigateTo(path);
    }
} else {
    navigateTo('posts');
}

// json creates navigation ---------------------------------------------------------------------------------------------
Requests.getMyPosts("configs.json")
    .then((data) => {
        let html = readJson(data, path);
        // console.log(html);
        ul.innerHTML += html;
    })
    .then(() => {
        const myLinks = document.querySelectorAll("a");
        myLinks.forEach((elem) => {
            if (elem.getAttribute("aria-valuenow") === path) {
                elem.parentElement.parentElement.parentElement.parentElement.children[0].classList.add("bg-primary");
                elem.classList.add("bg-primary")
            }
        })
    })






