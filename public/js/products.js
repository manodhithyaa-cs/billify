  const form = document.getElementById('product-form');
  const nameInput = document.getElementById('product-name');
  const priceInput = document.getElementById('product-price');
  const idInput = document.getElementById('product-id');
  const tableBody = document.getElementById('product-table-body');

  let products = [];
  let count = 1;

  function renderTable() {
    tableBody.innerHTML = '';
    products.forEach((product, index) => {
      const row = document.createElement('tr');
      row.className = 'border-t border-white hover:bg-[#4A4950] transition-colors';
      row.innerHTML = `
        <td class="px-4 py-3">${index + 1}</td>
        <td class="px-4 py-3">${product.name}</td>
        <td class="px-4 py-3">₹${product.price}</td>
        <td class="px-4 py-3 space-x-2">
          <button onclick="editProduct(${index})" class="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-xs">Edit</button>
          <button onclick="deleteProduct(${index})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs">Delete</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  function editProduct(index) {
    const product = products[index];
    nameInput.value = product.name;
    priceInput.value = product.price;
    idInput.value = index;
  }

  function deleteProduct(index) {
    if (confirm("Are you sure you want to delete this product?")) {
      products.splice(index, 1);
      renderTable();
    }
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value.trim());

    const index = idInput.value;
    if (index !== '') {
      // Update
      products[index] = { name, price };
      idInput.value = '';
    } else {
      // Add
      products.push({ name, price });
    }

    form.reset();
    renderTable();
  });