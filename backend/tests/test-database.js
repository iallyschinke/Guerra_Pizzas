const db = require("../database");

console.log("\n--- INSERINDO PIZZA ---");

const insert = db.prepare(`
  INSERT INTO pizzas (
    nome,
    descricao,
    preco,
    imagem,
    categoria,
    disponivel
  )
  VALUES (?, ?, ?, ?, ?, ?)
`);

const result = insert.run(
  "Calabresa",
  "Molho de tomate, mussarela, calabresa e cebola",
  32.9,
  "assets/calabresa.jpg",
  "Tradicional",
  1,
);

console.log("Pizza cadastrada com ID:", result.lastInsertRowid);

console.log("\n--- CONSULTANDO PIZZAS ---");

const pizzas = db
  .prepare(
    `
  SELECT * FROM pizzas
`,
  )
  .all();

console.log(pizzas);
