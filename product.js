class Product {
    constructor(name, price, quantity) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
    }

    calculateFullPrice() {
        return this.price * this.quantity;
    }

    displayProductDetails() {
        return `Product Name: ${this.name}, Price: $${this.price}, Quantity: ${this.quantity}`;
    }
}

const shoppingCart = {
    products: [
        new Product("Airpods", 199, 2),
        new Product("Laptop", 999, 1),
        new Product("Smartphone", 599, 3),
    ],

    getTotalAmount() {
        return this.products.reduce((total, product) => total + product.calculateFullPrice(), 0);
    },

    addProduct(name, price, quantity) {
        const newProduct = new Product(name, price, quantity);
        this.products.push(newProduct);
        return newProduct;
    },

    editProduct(index, name, price, quantity) {
        if (index >= 0 && index < this.products.length) {
            this.products[index].name = name;
            this.products[index].price = price;
            this.products[index].quantity = quantity;
        }
    }
};

function searchProducts() {
    const searchInput = document.getElementById("searchProduct");
    const searchValue = searchInput.value.toLowerCase();

    const filteredProducts = shoppingCart.products.filter(product =>
        product.name.toLowerCase().includes(searchValue)
    );

    displayProducts(filteredProducts);
}

function displayProducts(products = shoppingCart.products) {
    const productList = document.getElementById("productList");
    productList.innerHTML = "";
    products.forEach((product, index) => {
        const row = productList.insertRow(-1);
        row.innerHTML = `
            <td><input type="text" id="name-${index}" value="${product.name}"></td>
            <td><input type="number" id="price-${index}" value="${product.price}"></td>
            <td><input type="number" id="quantity-${index}" value="${product.quantity}"></td>
            <td>$${product.calculateFullPrice().toFixed(2)}</td>
            <td><button class="btn btn-primary" onclick="editProduct(${index})">Edit</button></td>
            <td><input type="radio" name="delete-product" value="${index}"></td>
        `;
    });
}

function editProduct(index) {
    const nameInput = document.getElementById(`name-${index}`);
    const priceInput = document.getElementById(`price-${index}`);
    const quantityInput = document.getElementById(`quantity-${index}`);

    const name = nameInput.value;
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);

    if (name && !isNaN(price) && !isNaN(quantity)) {
        shoppingCart.editProduct(index, name, price, quantity);
        displayProducts();
        displayTotalAmount();
    } else {
        alert("Please enter valid product information.");
    }
}

function deleteSelectedProducts() {
    const productList = document.getElementById("productList");
    const rows = productList.querySelectorAll("tr");
    const indicesToDelete = [];

    rows.forEach((row, index) => {
        const checkbox = row.querySelector("input[type='radio']");
        if (checkbox && checkbox.checked) {
            indicesToDelete.push(index);
        }
    });

    indicesToDelete.sort((a, b) => b - a);

    indicesToDelete.forEach((index) => {
        shoppingCart.products.splice(index, 1);
    });

    displayProducts();
    displayTotalAmount();
}

function displayTotalAmount() {
    const totalAmount = document.getElementById("totalAmount");
    totalAmount.textContent = `$${shoppingCart.getTotalAmount().toFixed(2)}`;
}

function addNewProduct() {
    const productName = document.getElementById("productName").value;
    const productPrice = parseFloat(document.getElementById("productPrice").value);
    const productQuantity = parseInt(document.getElementById("productQuantity").value);

    if (productName && !isNaN(productPrice) && !isNaN(productQuantity)) {
        shoppingCart.addProduct(productName, productPrice, productQuantity);
        displayProducts();
        displayTotalAmount();

        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productQuantity").value = "";
    } else {
        alert("Please enter valid product information.");
    }
}

displayProducts();
displayTotalAmount();

document.getElementById("addProduct").addEventListener("click", addNewProduct);
document.getElementById("deleteProducts").addEventListener("click", deleteSelectedProducts);
document.getElementById("searchProduct").addEventListener("input", searchProducts);
