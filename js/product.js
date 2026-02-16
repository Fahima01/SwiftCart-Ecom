const loadProductCategoris = () => {
    const url = ("https://fakestoreapi.com/products/categories");
    fetch(url)
        .then(res => res.json())
        .then(json => displayCategory(json));
}

const displayCategory = (categories) => {
    console.log(categories)

    const productCategories = document.getElementById("product-categories");
    productCategories.innerHTML = `<button class="btn btn-primary">
            All
        </button>`;

    //load the buttons
    for (category of categories) {
        const categoryBtn = document.createElement("div")
        categoryBtn.innerHTML = `
        <button class="btn btn-primary">${category}</button>
        `

        productCategories.appendChild(categoryBtn);
    }

}

loadProductCategoris();