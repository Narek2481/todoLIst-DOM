let text = "";

export function readJson(data) {
    // let arrow = "<img src='../images/arrow right.png'/>";
    text += '<ul class="nav">';
    data.forEach((elem) => {
        text += "<ul class='nav'>";
        text += "<li>";
        if (elem.group) {
            text += `
                <h2 class="flex gap-20 align-center">
                    <img src="../images/Category.png"/>
                    ${elem.group}  
                    <img src="../images/arrow right.png" class="arrow" />
                </h2>
            `;
        } else if (elem.title) {
            // console.log(elem.path, "elem path");
            // console.log(path, "path");
            text += `
                <a aria-valuenow="${elem.path}" class="flex gap-20  align-center myLink ">
                    <img src="../images/Category.png"/>
                    <span>${elem.title}</span>
                    <img src="../images/arrow right.png"  />
                </a>
            `;
        }
        if (elem.pages && elem.pages.length > 0) {
            readJson(elem.pages);
        }
        if (elem.children && elem.children.length > 0) {
            readJson(elem.children);
        }
        text += "</li>";
        text += "</ul>";
    });
    text += "</ul>";
    return text;
}


