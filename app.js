const employees = [
  "Employee 1",
  "Employee 2",
  "Employee 3",
  "Employee 4",
  "Employee 5",
  "Employee 6",
  "Employee 7",
  "Employee 8",
  "Employee 9",
  "Employee 10"
];

const app = document.getElementById("app");

employees.forEach(name => {
  const div = document.createElement("div");
  div.className = "employee";

  div.innerHTML = `
    <strong>${name}</strong><br>
    Hours: <input type="number" step="0.5"><br>
  `;

  app.appendChild(div);
});
