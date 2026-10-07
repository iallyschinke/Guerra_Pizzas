const form = document.getElementById("pizza-form");
const mensagem = document.getElementById("mensagem");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const pizza = {
    nome: document.getElementById("nome").value.trim(),

    descricao: document.getElementById("descricao").value.trim(),

    preco: Number(document.getElementById("preco").value),

    categoria: document.getElementById("categoria").value,

    disponivel: document.getElementById("disponivel").checked ? 1 : 0,
  };

  try {
    const resposta = await fetch("http://localhost:3000/pizzas", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(pizza),
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      throw new Error(dados.message || "Erro ao cadastrar pizza.");
    }

    mostrarMensagem("Pizza cadastrada com sucesso!", "success");

    form.reset();

    document.getElementById("disponivel").checked = true;
  } catch (error) {
    console.error(error);

    mostrarMensagem(error.message, "danger");
  }
});

function mostrarMensagem(texto, tipo) {
  mensagem.className = `alert alert-${tipo}`;

  mensagem.textContent = texto;
}
