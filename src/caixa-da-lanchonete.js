import { CalcularTotal } from "./calcular-total.js";
import { ValidarRegra } from "./validar-regra.js";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    const { status, erro } = new ValidarRegra(
      metodoDePagamento,
      itens
    ).validarRegras();

    if (status === false) {
      return erro;
    }

    return new CalcularTotal(itens, metodoDePagamento).calcular();
  }
}

export { CaixaDaLanchonete };
