export const produtos = [
  { id: 1, nome: "Sabonete", preco: 3.5, estoque: 10 },
  { id: 2, nome: "Shampoo", preco: 12.0, estoque: 5 },
  { id: 3, nome: "Máscara Capilar", preco: 25.0, estoque: 2 },
];

const mapaProdutos = new Map();
produtos.forEach((p) => mapaProdutos.set(p.id, p));

// 🔥 Mapa de cupons
export const cupons = new Map([
  ["DESCONTO10", 10],
  ["BLACKFRIDAY", 30],
  ["PROMO5", 5],
]);

export const catalogo = {
  listarProdutos() {
    try {
      return produtos;
    } catch (erro) {
      console.error("Erro ao listar:", erro.message);
      return [];
    }
  },

  buscarPorNome(nome) {
    try {
      if (!nome || nome.trim() === "") {
        throw new Error("Nome inválido para busca.");
      }
      return produtos.filter((prod) =>
        prod.nome.toLowerCase().includes(nome.toLowerCase()),
      );
    } catch (erro) {
      console.error("Erro ao buscar por nome:", erro.message);
      return [];
    }
  },

  buscarPorId(id) {
    try {
      if (!mapaProdutos.has(id)) {
        throw new Error(`Produto com ID ${id} não encontrado.`);
      }
      return mapaProdutos.get(id);
    } catch (erro) {
      console.error("Erro buscarPorId:", erro.message);
      return null;
    }
  },

  filtrarPorPreco(min, max) {
    try {
      if (min < 0 || max < 0 || min > max) {
        throw new Error("Faixa de preço inválida.");
      }
      return produtos.filter((p) => p.preco >= min && p.preco <= max);
    } catch (erro) {
      console.error("Erro filtrarPorPreco:", erro.message);
      return [];
    }
  },

  atualizarEstoque(id, delta) {
    try {
      if (!mapaProdutos.has(id)) throw new Error("Produto não existe.");

      const produto = mapaProdutos.get(id);

      if (produto.estoque + delta < 0) {
        throw new Error("Estoque insuficiente.");
      }

      produto.estoque += delta;
      return produto;
    } catch (erro) {
      console.error("Erro ao atualizar estoque:", erro.message);
      return null;
    } finally {
      console.log("Operação de estoque finalizada.");
    }
  },

  ordenarPorPreco(ordem = "asc") {
    try {
      const listaOrdenada = [...produtos].sort((a, b) => {
        if (ordem === "desc") {
          return b.preco - a.preco; // maior para menor
        }
        return a.preco - b.preco; // menor para maior
      });

      return listaOrdenada;
    } catch (erro) {
      console.error("Erro ordenarPorPreco:", erro.message);
      return produtos;
    }
  },

  aplicarCupom(codigo, total) {
    try {
      if (!cupons.has(codigo)) {
        throw new Error("Cupom inválido.");
      }

      const percentual = cupons.get(codigo);
      const desconto = total * (percentual / 100);

      return Number((total - desconto).toFixed(2));
    } catch (erro) {
      console.error("Erro ao aplicar cupom:", erro.message);
      return total;
    }
  },
};
