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

