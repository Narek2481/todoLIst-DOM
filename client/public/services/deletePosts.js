
export function renderDelete(root) {
    let html = `
        <div class="deleteContainerBlack none" >
            <div class="whiteContainer">
                <h2 class="pb-1">Are you sure you want to delete this item?</h2>
                <div class="flex jc-start gap-8 pt-1 ">
                    <button id="deleteAcsess" class="color-white">Delete</button>
                    <button id="closeDelete" class="color-white">close</button>
                </div>
            </div>
        </div>
    
    `

    root.innerHTML += html;
}