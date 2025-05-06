
const products = [
    {
        title: "Slub jersey T-shirt",
        image: "/assets/849c44096ecda397209c828ae431c68747f09dd0.jpg",
        category: "T-shirts & Vests"
    },
    {
        title: "Printed T-shirt",
        image: "/assets/121d46d34f30fbc3531d9b339062aea64ed93d11.jpg",
        category: "T-shirts & Vests"
    },
    {
        title: "Cotton T-shirt",
        image: "/assets/24e56ac03cf84b441b1d38ee88a500cbbe60baba.jpg",
        category: "T-shirts & Vests"
    },
    {
        title: "T-shirt with a motif",
        image: "/assets/2d37cf6bd23044bb120b5a34aca2ae92c3b752e5.jpg",
        category: "T-shirts & Vests"
    },
    {
        title: "Cotton T-shirt Regular Fit",
        image: "/assets/1486751737f9375478493307aa4bd0bd9533cb27.jpg",
        category: "T-shirts & Vests"
    },
    {
        title: "Slub jersey T-shirt",
        image: "/assets/da69f135f565747077dbf1ed617e70f8cff94cbf.jpg",
        category: "T-shirts & Vests"
    },
]

const categories = [
    "Jackets & Coats",
    "Hoodies",
    "T-shirts & Vests",
    "Shirts",
    "Blazers & Suits",
    "Jeans",
    "Trousers",
    "Shorts",
    "Underwear",
    "Gift Sets",
];

const sideMenu = document.getElementById("sideMenu");
const MainProducts = document.getElementById("mainProducts");

function showProducts(selectedCategory) {
    MainProducts.innerHTML = "";

    products.forEach(product => {
        if (product.category === selectedCategory) {
            const productCard = document.createElement("div");
            productCard.className = "text-center";
            productCard.innerHTML = `
                <img src="${product.image}" class="w-full h-[340px] rounded-[10px] object-cover">
                <p class="text-400 font-bold text-[14px] mt-[15px] mb-[5px] text-[#1E0E62] uppercase">${product.title}</p>
                <p class="text-400 font-bold text-[14px] mb-[10px] text-[#482BE7]">$ 12.99</p>
                <button class="bg-white font-bold text-[#1E0E62] rounded-full border-2 border-solid p-2 border-[#EBEAED] hover:bg-gray-100">Add to Cart</button>
            `;
            MainProducts.appendChild(productCard);
        }
    });
}

const navigation = document.createElement("div");
navigation.className = 'space-y-2';
let activeCategory = "T-shirts & Vests";

categories.forEach(category => {
    const button = document.createElement("button");
    button.className = `w-full text-left px-[2px] py-[2px] font-medium rounded hover:bg-gray-100 ${category === activeCategory ? "text-purple-700 font-bold" : "text-gray-500"
        }`;
    button.textContent = category;

    button.addEventListener("click", () => {
        activeCategory = category;

        document.querySelectorAll("#sideMenu button").forEach(btn => {
            btn.classList.remove("text-purple-700", "font-bold");
            btn.classList.add("text-gray-500");
        });
        button.classList.add("text-purple-700", "font-bold");

        let itemsCount = products.filter(product => product.category === category).length;
        document.querySelector("#items").textContent = `${itemsCount} ITEMS`;

        showProducts(activeCategory);
    });

    navigation.appendChild(button);
});

sideMenu.appendChild(navigation);

showProducts(activeCategory);