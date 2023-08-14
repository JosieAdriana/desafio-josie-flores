import { relacaoItens, formasPagamento } from "./dados";

class ValidarRegra {
  constructor(metodoDePagamento, itens) {
    this.metodoDePagamento = metodoDePagamento;
    this.itens = itens;
  }

  validarRegras() {
    if (!this.itensComQuantidadeMaiorQueZero()) {
      return {
        status: false,
        erro: "Não há itens no carrinho de compra!",
      };
    }

    if (!this.formaDePagamentoValida()) {
      return {
        status: false,
        erro: "Forma de pagamento inválida!",
      };
    }

    if (!this.itemComQuantidadeMaiorQueZero()) {
      return {
        status: false,
        erro: "Quantidade inválida!",
      };
    }

    if (!this.itensComCodigoExistente()) {
      return {
        status: false,
        erro: "Item inválido!",
      };
    }

    if (!this.itemExtraDeveAcompanharItemPrincipal()) {
      return {
        status: false,
        erro: "Item extra não pode ser pedido sem o principal",
      };
    }

    return {
      status: true
    }
  }

  itemComQuantidadeMaiorQueZero() {
    return this.itens.every(function (item) {
      let [, quantidade] = item.split(",");

      if (parseInt(quantidade) === 0) {
        return false;
      }

      return true;
    });
  }

  itensComCodigoExistente() {
    return this.itens.every(function (item) {
      let [codigo] = item.split(",");

      const itemComCodigoExistente = relacaoItens.find(
        (relacaoItem) => relacaoItem.codigo === codigo
      );

      if (itemComCodigoExistente === undefined) {
        return false;
      }

      return true;
    });
  }

  itemExtraDeveAcompanharItemPrincipal() {
    const relacaoItensExtras = [
      {
        item: "cafe",
        extra: "chantily",
      },
      {
        item: "sanduiche",
        extra: "queijo",
      },
    ];

    return relacaoItensExtras.every((relacaoItemExtra) => {
      const encontradoExtra = this.itens.find((itemProcurado) => {
        let [codigo] = itemProcurado.split(",");

        return codigo === relacaoItemExtra.extra;
      });

      if (encontradoExtra === undefined) {
        return true;
      }

      const encontradoPrincipal = this.itens.find((itemProcurado) => {
        let [codigo] = itemProcurado.split(",");

        return codigo === relacaoItemExtra.item;
      });

      if (encontradoPrincipal === undefined) {
        return false;
      }

      return true;
    });
  }

  formaDePagamentoValida() {
    return formasPagamento.includes(this.metodoDePagamento);
  }

  itensComQuantidadeMaiorQueZero() {
    return this.itens.length > 0;
  }
}

export { ValidarRegra };
