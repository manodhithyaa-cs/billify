  const filterText = document.getElementById('filter-text');
  const filterDate = document.getElementById('filter-date');
  const tableBody = document.getElementById('table-body');

  function filterTable() {
    const textValue = filterText.value.toLowerCase();
    const dateValue = filterDate.value; // yyyy-mm-dd

    [...tableBody.rows].forEach(row => {
      const name = row.cells[1].textContent.toLowerCase();
      const phone = row.cells[2].textContent.toLowerCase();
      const rowDate = row.cells[4].getAttribute('data-date');

      // Filter by text: matches name or phone
      const matchesText = !textValue || name.includes(textValue) || phone.includes(textValue);

      // Filter by date: match exact date or ignore if no date selected
      const matchesDate = !dateValue || rowDate === dateValue;

      if (matchesText && matchesDate) {
        row.style.display = '';
      } else {
        row.style.display = 'none';
      }
    });
  }

  filterText.addEventListener('input', filterTable);
  filterDate.addEventListener('change', filterTable);