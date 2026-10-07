const express = require("express");
const cors = require("cors");

const db = require("../database");

const app = express();

app.use(cors());
app.use(express.json());

// Buscar pizzas disponíveis
app.get("/pizzas", (req, res) => {
  try {
    const pizzas = db
      .prepare(
        `
        SELECT *
        FROM pizzas
        WHERE disponivel = 1
      `,
      )
      .all();

    return res.status(200).json(pizzas);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Erro ao buscar pizzas.",
    });
  }
});

// Cadastrar nova pizza
app.post("/pizzas", (req, res) => {
  try {
    const { nome, descricao, preco, categoria, disponivel = 1 } = req.body;

    if (!nome || !descricao || preco === undefined) {
      return res.status(400).json({
        message: "Nome, descrição e preço são obrigatórios.",
      });
    }

    const resultado = db
      .prepare(
        `
        INSERT INTO pizzas
        (nome, descricao, preco, categoria, disponivel)
        VALUES (?, ?, ?, ?, ?)
      `,
      )
      .run(nome, descricao, preco, categoria, disponivel);

    const pizza = db
      .prepare(
        `
        SELECT *
        FROM pizzas
        WHERE id = ?
      `,
      )
      .get(resultado.lastInsertRowid);

    return res.status(201).json({
      message: "Pizza cadastrada com sucesso!",
      pizza,
    });
  } catch (error) {
    console.error("Erro ao cadastrar pizza:", error);

    return res.status(500).json({
      message: "Erro ao cadastrar pizza.",
    });
  }
});

// Iniciar servidor
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
