import { catalogo } from "./catalogo.js";

export const carrinho = [];

export function encontrarItemCarrinho(carrinho, produtoId) {
  try {
    return carrinho.findIndex((item) => item.produtoId === produtoId);
  } catch (erro) {
    console.error("Erro ao encontrar item:", erro.message);
    return -1;
  }
}

export function validarEstoque(produtoId, quantidadeDesejada) {
  try {
    const produto = catalogo.buscarPorId(produtoId);
    if (!produto) throw new Error("Produto não encontrado no catálogo.");

    return quantidadeDesejada <= produto.estoque;
  } catch (erro) {
    console.error("Erro ao validar estoque:", erro.message);
    return false;
  }
}

export function adicionar(carrinho, produtoId, qtd) {
  try {
    const quantidade = Number(qtd);
    if (quantidade <= 0 || !Number.isFinite(quantidade)) {
      throw new Error("Quantidade inválida.");
    }

    const produto = catalogo.buscarPorId(produtoId);
    if (!produto) throw new Error("Produto não existe.");

    const indice = encontrarItemCarrinho(carrinho, produtoId);
    const quantidadeAtual = indice >= 0 ? carrinho[indice].quantidade : 0;
    const novaQtdTotal = quantidadeAtual + quantidade;

    if (!validarEstoque(produtoId, novaQtdTotal)) {
      throw new Error("Estoque insuficiente.");
    }

    if (indice >= 0) {
      carrinho[indice].quantidade = novaQtdTotal;
    } else {
      carrinho.push({ produtoId, quantidade });
    }

    console.log(`Adicionado: ${quantidade}x ${produto.nome}`);
    return true;
  } catch (erro) {
    console.error("Erro ao adicionar item:", erro.message);
    return false;
  } finally {
    console.log("Operação de adicionar finalizada.");
  }
}

export function remover(carrinho, produtoId) {
  try {
    const index = encontrarItemCarrinho(carrinho, produtoId);

    if (index === -1) throw new Error("Item não está no carrinho.");

    const item = carrinho[index];

    catalogo.atualizarEstoque(produtoId, item.quantidade);
    carrinho.splice(index, 1);

    console.log("Item removido do carrinho.");
  } catch (erro) {
    console.error("Erro ao remover item:", erro.message);
  } finally {
    console.log("Operação remover finalizada.");
  }
}

export function listarCarrinho(carrinho) {
  try {
    if (carrinho.length === 0) {
      console.log("\nCarrinho vazio.\n");
      return;
    }

    console.log("\n===== ITENS NO CARRINHO =====");

    for (const item of carrinho) {
      const produto = catalogo.buscarPorId(item.produtoId);
      const subtotal = produto.preco * item.quantidade;
      imprimirItem(item, produto, subtotal);
    }
  } catch (erro) {
    console.error("Erro ao listar carrinho:", erro.message);
  }
}

function imprimirItem(item, produto, subtotal) {
  try {
    console.log(`
      📦 Produto: ${produto.nome}
      🔢 Quantidade: ${item.quantidade}
      💲 Preço unitário: R$ ${produto.preco.toFixed(2)}
      💰 Subtotal: R$ ${subtotal.toFixed(2)}
      ------------------------------`);
  } catch (erro) {
    console.error("Erro ao imprimir item:", erro.message);
  }
}

export function alterarQuantidade(carrinho, produtoId, novaQtd) {
  try {
    const quantidade = Number(novaQtd);
    if (!Number.isFinite(quantidade)) throw new Error("Quantidade inválida.");

    const item = carrinho.find((item) => item.produtoId === produtoId);
    if (!item) throw new Error("Item não encontrado no carrinho.");

    const produto = catalogo.buscarPorId(produtoId);

    if (quantidade === 0) {
      remover(carrinho, produtoId);
      return;
    }

    const diferenca = quantidade - item.quantidade;

    if (diferenca > 0 && produto.estoque < diferenca) {
      throw new Error("Estoque insuficiente para aumentar a quantidade.");
    }

    catalogo.atualizarEstoque(produtoId, -diferenca);
    item.quantidade = quantidade;

    console.log(`Quantidade atualizada para ${quantidade}.`);
  } catch (erro) {
    console.error("Erro ao alterar quantidade:", erro.message);
  } finally {
    console.log("Operação de alteração finalizada.");
  }
}

export function calcularTotal(carrinho) {
  try {
    return carrinho.reduce((total, item) => {
      const produto = catalogo.buscarPorId(item.produtoId);
      return total + produto.preco * item.quantidade;
    }, 0);
  } catch (erro) {
    console.error("Erro ao calcular total:", erro.message);
    return 0;
  }
}

export function sorteioPromo(lista) {
  try {
    if (!Array.isArray(lista) || lista.length === 0) {
      throw new Error("Lista de promoções inválida.");
    }

    const i = Math.floor(Math.random() * lista.length);
    return lista[i];
  } catch (erro) {
    console.error("Erro no sorteio:", erro.message);
    return null;
  }
}
