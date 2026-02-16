// Menu links active style
const menuLinks = document.querySelectorAll("#navbar-menu a");

menuLinks.forEach(link => {
    link.addEventListener("click", function () {
        // remove active class from all
        menuLinks.forEach(item => {
            item.classList.remove("text-[#422ad5]", "active");
        });

        // add active class to clicked one
        this.classList.add("text-[#422ad5]", "active");
    });
});

// Display top 3 featured products//
// Load products from API
const loadProducts = () => {

    const url = "https://fakestoreapi.com/products";

    fetch(url)
        .then(res => res.json())
        .then(data => {

            //console.log("All Products:", data);

            // sort by highest rating
            const sortedProducts = data.sort((a, b) => {
                return b.rating.rate - a.rating.rate;
            });

            //console.log("Sorted Products:", sortedProducts);

            // get top 3 products
            const topProducts = sortedProducts.slice(0, 3);

            //console.log("Top 3 Products:", topProducts);

            // send to display function
            displayProducts(topProducts);

        });

};


// Display products on UI
const displayProducts = (products) => {

    const container = document.getElementById("featured-products");

    // clear container first
    container.innerHTML = "";

    // loop through products
    products.forEach(product => {

        //console.log("Displaying:", product.title);

        const productCard = document.createElement("div");

        productCard.innerHTML = `
        <div class="card bg-base-100 shadow-md border border-base-200">
                    <figure class="bg-gray-100 rounded-t-xl">
                        <img src="${product.image}" alt="Backpack"
                            class="h-72 object-contain p-6" />
                    </figure>
                    <div class="card-body">
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

        container.append(productCard);

    });

};


// Details button function
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


// Add to cart button function
const handleAddToCart = (id) => {

    //console.log("Add clicked for product ID:", id);

};


// call function
loadProducts();