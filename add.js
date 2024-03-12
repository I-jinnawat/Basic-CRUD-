const api = "http://localhost:3000/api/product";
let productData = [];
let modal;
let productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];
let addProductModal;

const loadData = async () => {
    try {
        const res = await axios.get(api);
        productData = res.data;
        renderTable();
    } catch (error) {
        console.error("Can't load Data:", error);
    }
};

const renderTable = () => {
    productTable.innerHTML = '';
    productData.forEach((product, index) => {
        const row = document.createElement('tr');
        row.dataset.productId = product._id;

        const nameCell = createTableCell(product.name);
        const priceCell = createTableCell(product.price);
        const detailCell = createTableCell(product.detail);

        row.appendChild(createTableCell(index + 1));
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(detailCell);

        productTable.appendChild(row);
    });
};

function createTableCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

async function createProduct(productData) {
    try {
        const res = await axios.post(api, productData);
        if (res.status === 201) {
            console.log("Product created:", res.data);
            productData.push(res.data);
            renderTable();
            addProductModal.hide();
        } else {
            console.log("Failed to create product:", res.statusText);
        }
    } catch (error) {
        console.log("Error creating product:", error);
    }
}

document.getElementById('addProductButton').addEventListener('click', function () {
    addProductModal.show();
});

document.getElementById('saveChanges').addEventListener('click', function () {
    const productName = document.getElementById('productName').value;
    const productPrice = document.getElementById('productPrice').value;
    const productDetail = document.getElementById('productDetail').value;

    const newProduct = {
        name: productName,
        price: productPrice,
        detail: productDetail
    };
    
    createProduct(newProduct);
});

document.addEventListener('DOMContentLoaded', () => {
    addProductModal = new bootstrap.Modal(document.getElementById('addproductModal'));
    loadData();
});
