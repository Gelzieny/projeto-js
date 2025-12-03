import {
  carrinho,
  adicionar,
  remover,
  alterarQuantidade,
  listarCarrinho,
  calcularTotal,
  sorteioPromo,
} from "./carrinho.js";

import { catalogo, produtos } from "./catalogo.js";

console.log("=== MINI LOJA ===");

try {
  console.log("\n Catálogo Inicial:");
  console.table(catalogo.listarProdutos());

  adicionar(carrinho, 1, 3);
  adicionar(carrinho, 3, 1);
  adicionar(carrinho, 4, 2); // vai cair no catch → produto não existe

  console.log("\n Carrinho Atual:");
  listarCarrinho(carrinho);

  console.log("\nAlterando quantidade...");
  alterarQuantidade(carrinho, 1, 5);

  console.log("\nRemovendo produto...");
  remover(carrinho, 3);

  let total = calcularTotal(carrinho);
  console.log("\nTotal sem desconto:", total.toFixed(2));

  const totalComCupom = catalogo.aplicarCupom("DESCONTO10", total);

  console.log("Total com cupom DESCONTO10:", totalComCupom);

  console.log("\nBusca por nome:");
  console.log(catalogo.buscarPorNome("Sab"));

  console.log("\nProdutos entre 10 e 30:");
  console.table(catalogo.filtrarPorPreco(10, 30));

  console.log("\nPromo aleatória:");
  console.log(sorteioPromo(produtos));
} catch (erro) {
  console.error("Erro geral na aplicação:", erro.message);
}
