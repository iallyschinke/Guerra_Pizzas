const path = require("path");
const Database = require("better-sqlite3");

// Caminho do banco correto
const dbPath = path.join(__dirname, "data", "guerra_pizzas.db");

// Conecta ao banco
const db = new Database(dbPath);

console.log("Banco de dados SQLite conectado com sucesso.");
console.log("Banco usado:", dbPath);

// Cria a tabela caso ainda não exista
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS pizzas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    preco REAL NOT NULL,
    categoria TEXT,
    disponivel INTEGER DEFAULT 1
  )
`,
).run();

console.log("Tabela pizzas pronta para uso.");

module.exports = db;
