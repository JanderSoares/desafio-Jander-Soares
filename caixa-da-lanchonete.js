class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento=null, itens=null) {
        var cardapio=['cafe','chantily','suco','sanduiche','queijo','salgado','combo1','combo2'];
        var valores=[3,1.5,6.2,6.5,2,7.25,9.5,7.5];

        if(!(metodoDePagamento=='dinheiro' || metodoDePagamento=='debito' || metodoDePagamento=='credito')){
            return 'Forma de pagamento inválida!';
        }

        if(itens==[] || itens==null || itens==''){
            return 'Não há itens no carrinho de compra!';
        }

        var itemAtual=[];
        var codigos=[];
        var quant=[];
        for(var a=0;a<itens.length;a++){
            itemAtual=[];
            itemAtual=itens[a].split(',');
            if(itemAtual.length==2){
                if(this.verificaItem(itemAtual[0],cardapio)){
                    codigos[a]=itemAtual[0];
                } else{
                    return 'Item inválido!';
                }
            } else{
                return 'Item inválido!';
            }

            if(Number(itemAtual[1])<1){
                return 'Quantidade inválida!'
            } else{
                quant[a]=itemAtual[1];
            }
        }

        if(!this.verificaItemExtra(codigos)){
            return 'Item extra não pode ser pedido sem o principal';
        }

        var pagar=0;
        for(var a=0;a<codigos.length;a++){
            for(var b=0;b<cardapio.length;b++){
                if(codigos[a]==cardapio[b]){
                    pagar+=quant[a]*valores[b];
                    break;
                }
            }
        }

        if(metodoDePagamento=='dinheiro'){
            pagar=0.95*pagar;
        } else if(metodoDePagamento=='credito'){
            pagar=1.03*pagar;
        }

        return 'R$ '+pagar.toFixed(2).replace('.',',');
    }

    verificaItem(item,cardapio){
        for(var a=0;a<cardapio.length;a++){
            if(item==cardapio[a]){
                return true;
            }
        }
        return false;
    }

    verificaItemExtra(codigos){
        for(var a=0;a<codigos.length;a++){
            if(codigos[a]=='chantily'){
                if(!this.verificaItem('cafe',codigos)){
                    return false;
                }
            }

            if(codigos[a]=='queijo'){
                if(!this.verificaItem('sanduiche',codigos)){
                    return false;
                }
            }
        }
        return true;
    }

}

export { CaixaDaLanchonete };
