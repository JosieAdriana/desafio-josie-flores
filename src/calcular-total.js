import { relacaoItens } from "./dados.js";

class CalcularTotal {
  constructor(itens, metodoDePagamento) {
    this.itens = itens;
    this.metodoDePagamento = metodoDePagamento;
  }

  calcular() {
    const total =
      this.calcularTotalBrutoAPagar(this.itens) *
      this.calcularCorrecaoFormaPagamento();

    return parseFloat(total.toFixed(2)).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  calcularTotalBrutoAPagar() {
    let totalApagar = 0;

    for (let i = 0; i < this.itens.length; i++) {
      let [codigo, quantidade] = this.itens[i].split(",");

      const item = relacaoItens.find((elemento) => elemento.codigo === codigo);

      totalApagar = totalApagar + quantidade * item.valor;
    }

    return totalApagar;
  }

  calcularCorrecaoFormaPagamento() {
    if (this.metodoDePagamento === "dinheiro") {
      return 0.95;
    }

    if (this.metodoDePagamento === "debito") {
      return 1;
    }

    if (this.metodoDePagamento === "credito") {
      return 1.03;
    }
  }
}

export { CalcularTotal };
