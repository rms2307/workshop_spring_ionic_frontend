import { ProdutoDTO } from "./produto.dto";

export interface ItemPedidoFullDTO {
    quantidade: number;
    preco: string;
    desconto: string;
    produto: ProdutoDTO;
}