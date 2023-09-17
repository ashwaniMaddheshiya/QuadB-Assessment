document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:5000/api/getData")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const tableBody = document.querySelector("#crypto-table tbody");
      let count = 1;
      data.forEach((item) => {
        const row = document.createElement("tr");

        // Create and populate each table cell (td)
        const idCell = document.createElement("td");
        idCell.classList.add("td-align");
        const idText = document.createElement("h4");
        idText.classList.add("table-text");
        idText.textContent = count++;
        idCell.appendChild(idText);
        row.appendChild(idCell);

        const nameCell = document.createElement("td");
        nameCell.classList.add("td-align");
        const nameText = document.createElement("h4");
        nameText.classList.add("table-text");
        nameText.textContent = item.name;
        nameCell.appendChild(nameText);
        row.appendChild(nameCell);

        const lastPriceCell = document.createElement("td");
        lastPriceCell.classList.add("td-align");
        const lastPriceText = document.createElement("h4");
        lastPriceText.classList.add("table-text");
        lastPriceText.textContent = item.last;
        lastPriceCell.appendChild(lastPriceText);
        row.appendChild(lastPriceCell);

        const buySellPriceCell = document.createElement("td");
        buySellPriceCell.classList.add("td-align");
        const buySellPriceText = document.createElement("h4");
        buySellPriceText.classList.add("table-text");
        buySellPriceText.innerHTML = `<span>${item.buy} / ${item.sell}</span>`;
        buySellPriceCell.appendChild(buySellPriceText);
        row.appendChild(buySellPriceCell);

        const volumeCell = document.createElement("td");
        volumeCell.classList.add("td-align");
        const volumeText = document.createElement("h4");
        volumeText.classList.add("table-text");
        volumeText.textContent = item.volume;
        volumeCell.appendChild(volumeText);
        row.appendChild(volumeCell);

        const baseUnitCell = document.createElement("td");
        baseUnitCell.classList.add("td-align");
        const baseUnitText = document.createElement("h4");
        baseUnitText.classList.add("table-text");
        baseUnitText.textContent = item.base_unit;
        baseUnitCell.appendChild(baseUnitText);
        row.appendChild(baseUnitCell);

        // Add the row to the table body
        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error fetching data from backend:", error);
    });
});

const toggleTheme = () => {
  let element = document.body;
  element.classList.toggle("dark-mode");
};
