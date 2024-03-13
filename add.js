const api = "http://localhost:3000/api/product";
let productData = [];
let productId;
let productTable = document.getElementById('product-table').getElementsByTagName('tbody')[0];
let deleteConfirmationModal;

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
    productData.forEach((product) => {
        const row = document.createElement('tr');
        row.dataset.productId = product._id;

        const updateButton = createButton('Edit', 'btn-primary', editProduct);
        const deleteButton = createButton('Trash', 'btn-danger', confirmDeleteProduct);

        const nameCell = createTableCell(product.name);
        const priceCell = createTableCell(product.price);
        const detailCell = createTableCell(product.detail);

        const buttonCell = document.createElement('td');
        buttonCell.appendChild(updateButton);
        buttonCell.appendChild(deleteButton);

        row.appendChild(buttonCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);
        row.appendChild(detailCell);

        productTable.appendChild(row);
    });
};

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.innerHTML = `<i class="fas fa-${text.toLowerCase()}"></i>`;
    button.type = 'button';
    button.classList.add('btn', className, 'btn-sm');
    button.addEventListener('click', clickHandler);
    return button;
}

function createTableCell(text) {
    const cell = document.createElement('td');
    cell.textContent = text;
    return cell;
}

function editProduct(event) {
    productId = event.target.closest('tr').dataset.productId;
    const product = productData.find(product => product._id === productId);
    if (!product) {
        console.error("Error: Product not found");
        return;
    }
    const { name, price, detail } = product;
    populateModal(name, price, detail, showUpdatemodal); // Corrected function name here
}


function populateModal(name, price, detail, clickHandler) {
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productDetailTextarea = document.getElementById('productDetail');
    productNameInput.value = name;
    productPriceInput.value = price;
    productDetailTextarea.value = detail;
    clickHandler();
}

function confirmDeleteProduct(event) {
    productId = event.target.closest('tr').dataset.productId;
    deleteConfirmationModal.show();
}

document.getElementById('confirmDelete').addEventListener('click', function () {
    deleteProduct(productId);
    deleteConfirmationModal.hide();
});

document.addEventListener('DOMContentLoaded', () => {
    deleteConfirmationModal = new bootstrap.Modal(document.getElementById('deleteConfirmationModal'));
    loadData();
});
