
const loadProductCategoris = () => {

    const url = ("https://fakestoreapi.com/products/categories");
    fetch(url)
        .then(res => res.json())
        .then(json => displayCategory(json));
}

const displayCategory = (categories) => {
    //console.log(categories)

    const productCategories = document.getElementById("product-categories");
    productCategories.innerHTML = `<button id="btn-all" onclick="loadAllProducts(); setActiveButton('btn-all')" class="btn btn-outline btn-primary rounded-3xl">
            All
        </button>`;

    //load the buttons
    for (const category of categories) {

        const categoryBtn = document.createElement("div");

        const button = document.createElement("button");

        button.innerText = category;

        // UNIQUE ID
        button.id = `btn-${category.replace(/[^a-zA-Z0-9]/g, "")}`;

        button.classList = "btn btn-outline btn-primary rounded-3xl";

        button.onclick = () => {
            loadProductsByCategory(category);
            setActiveButton(button.id);
        };

        categoryBtn.appendChild(button);

        productCategories.appendChild(categoryBtn);
    }

}

const setActiveButton = (id) => {
    const buttons = document.querySelectorAll("#product-categories button");
    //console.log(buttons)
    buttons.forEach(btn => {
        btn.classList.remove("btn-primary");
        btn.classList.add("btn-outline");
    });


    const activeBtn = document.getElementById(id);

    activeBtn.classList.remove("btn-outline");
    activeBtn.classList.add("btn-primary");

}

loadProductCategoris();

// Load Spinner

const loadSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("all-products").classList.add("hidden");

    } else {
        document.getElementById("all-products").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");

    }
}

// Show products by category

const loadProductsByCategory = (category) => {
    loadSpinner(true);
    //console.log("Button clicked:", category);
    const url = `https://fakestoreapi.com/products/category/${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {

            displayCategoryItem(data);

            loadSpinner(false); // ✅ hide spinner HERE

        });

}

const displayCategoryItem = (products) => {

    const categoryProducts = document.getElementById("all-products");
    categoryProducts.innerHTML = "";

    products.forEach(product => {
        //console.log(item)
        const card = document.createElement("div");
        card.innerHTML = `
        <div class="card bg-base-100 shadow-md border border-base-200">
                    <figure class="bg-gray-100 rounded-t-xl">
                        <img src="${product.image}" alt="Backpack"
                            class="h-72 object-contain p-6" />
                    </figure>
                    <div class="card-body h-65">
                        <!-- Category + Rating -->
                        <div class="flex justify-between items-center mb-2">

                            <span class="badge bg-indigo-200 text-indigo-800 font-semibold">
                                ${product.category}
                            </span>

                            <div class="flex items-center gap-1 text-sm text-gray-500">
                                <i class="fa-solid fa-star text-yellow-400"></i> <span>${product.rating.rate}</span>
                            </div>

                        </div>

                        <!-- Title -->
                        <h2 class="card-title text-base font-semibold">
                            ${product.title}
                        </h2>

                        <!-- Price -->
                        <p class="text-xl font-bold text-gray-800">
                            $${product.price}
                        </p>

                        <!-- Buttons -->
                        <div class="card-actions grid grid-cols-2 gap-3 mt-4">

                            <button onclick="productDetails(${product.id})" class="btn btn-outline gap-2 w-full">
                                <i class="fa-regular fa-eye text-indigo-600"></i> Details
                            </button>

                            <button onclick="handleAddToCart(${product.id})" class="btn btn-primary gap-2 w-full">
                                <i class="fa-solid fa-cart-shopping"></i> Add
                            </button>

                        </div>


                    </div>
                </div>
        
        `;
        categoryProducts.append(card);
    });

}

// Add Cart Count
const cart = JSON.parse(localStorage.getItem("cart") || "[]");

// update cart count
const updateCartCount = () => {
    const countElement = document.getElementById("cart-count");

    if (countElement) {
        countElement.innerText = cart.length;
    }
};

updateCartCount();

// add to cart
const handleAddToCart = (id) => {

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    alert("✅ Item added to cart!");
};

const loadAllProducts = () => {
    loadSpinner(true);
    fetch("https://fakestoreapi.com/products")
        .then(res => res.json())
        .then(data => {
            displayAllProducts(data);
            loadSpinner(false);

        });

}

loadAllProducts();

const displayAllProducts = (products) => {
    //console.log(products)
    const allProductContainer = document.getElementById("all-products");
    allProductContainer.innerHTML = "";

    for (const product of products) {
        //console.log(product);
        const productCard = document.createElement("div");
        productCard.innerHTML = `
        <div class="card bg-base-100 shadow-md border border-base-200">
                    <figure class="bg-gray-100 rounded-t-xl">
                        <img src="${product.image}" alt="Backpack"
                            class="h-72 object-contain p-6" />
                    </figure>
                    <div class="card-body h-65">
                        <!-- Category + Rating -->
                        <div class="flex justify-between items-center mb-2">

                            <span class="badge bg-indigo-200 text-indigo-800 font-semibold">
                                ${product.category}
                            </span>

                            <div class="flex items-center gap-1 text-sm text-gray-500">
                                <i class="fa-solid fa-star text-yellow-400"></i> <span>${product.rating.rate}</span>
                            </div>

                        </div>

                        <!-- Title -->
                        <h2 class="card-title text-base font-semibold">
                            ${product.title}
                        </h2>

                        <!-- Price -->
                        <p class="text-xl font-bold text-gray-800">
                            $${product.price}
                        </p>

                        <!-- Buttons -->
                        <div class="card-actions grid grid-cols-2 gap-3 mt-4">

                            <button onclick="productDetails(${product.id})" class="btn btn-outline gap-2 w-full">
                                <i class="fa-regular fa-eye text-indigo-600"></i> Details
                            </button>

                            <button onclick="handleAddToCart(${product.id})" class="btn btn-primary gap-2 w-full">
                                <i class="fa-solid fa-cart-shopping"></i> Add
                            </button>

                        </div>


                    </div>
                </div>
        
        `;
        allProductContainer.appendChild(productCard);
    }
}

//Details of products
const productDetails = async (id) => {

    const url = `https://fakestoreapi.com/products/${id}`
    //console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(details => displayProductDetails(details))
};

const displayProductDetails = (details) => {
    // console.log(details)
    const detailsCard = document.getElementById("details-card")
    detailsCard.innerHTML = `
    <div class="mb-2">
                        <!-- Title -->
                        <h2 class="card-title text-2xl font-semibold mb-3">
                            ${details.title}
                        </h2>
                        <div class="flex items-center justify-start gap-2 text-sm text-gray-500">
                            <span class="badge bg-indigo-200 text-indigo-800 font-semibold">
                                ${details.category}
                            </span>
                            <i class="fa-solid fa-star text-yellow-400"></i><span>${details.rating.rate}</span>
                        </div>

                    </div>
                    <!-- Price -->
                    <p class="text-xl font-bold text-gray-800 my-3">
                        $${details.price}
                    </p>
                    <p class="text-slate-600"><span class="font-bold text-black">Product Details:</span>
                    ${details.description}</p>

                    <!-- Buttons -->
                    <div class="card-actions flex justify-end gap-3 mt-8">

                        <button class="btn btn-outline gap-2 ">
                            <i class="fa-solid fa-cart-shopping text-indigo-600"></i> Buy now
                        </button>

                        <button class="btn btn-primary gap-2 ">
                            <i class="fa-solid fa-cart-shopping"></i> Add to cart
                        </button>

                    </div>
    
    `;
    document.getElementById("product_modal").showModal();
}



