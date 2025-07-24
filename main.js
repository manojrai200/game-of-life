const width = 25;
const height = 20;
const gol = new GameOfLife(width, height);
const tds = [];

const table = document.createElement("tbody");
for (let h = 0; h < height; h++) {
  const tr = document.createElement("tr");
  for (let w = 0; w < width; w++) {
    const td = document.createElement("td");
    td.dataset.row = h;
    td.dataset.col = w;
    tds.push(td);
    tr.append(td);
  }
  table.append(tr);
}
document.getElementById("board").append(table);

const paint = () => {
  tds.forEach(td => {
    const row = td.dataset.row;
    const col = td.dataset.col;
    td.classList.toggle("alive", gol.getCell(row, col) === 1);
  });
};

document.getElementById("board").addEventListener("click", event => {
  const td = event.target;
  if (td.tagName === "TD") {
    const row = td.dataset.row;
    const col = td.dataset.col;
    gol.toggleCell(row, col);
    paint();
  }
});

document.getElementById("step_btn").addEventListener("click", () => {
  gol.tick();
  paint();
});

let interval = null;
document.getElementById("play_btn").addEventListener("click", () => {
  if (!interval) {
    interval = setInterval(() => {
      gol.tick();
      paint();
    }, 100);
  } else {
    clearInterval(interval);
    interval = null;
  }
});

document.getElementById("random_btn").addEventListener("click", () => {
  gol.forEachCell((row, col) => {
    gol.setCell(Math.random() < 0.3 ? 1 : 0, row, col);
  });
  paint();
});

document.getElementById("clear_btn").addEventListener("click", () => {
  gol.forEachCell((row, col) => {
    gol.setCell(0, row, col);
  });
  paint();
});
