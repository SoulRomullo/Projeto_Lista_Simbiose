class Produto {

    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar(){
        let produto = this.lerDados();

        if(this.validaCampos(produto)) {
            if(this.editId == null){
                this.adicionar(produto);
            }
            else{
                this.atualizar(this.editId, produto);
            }
        }

      this.listaTabela();
      this.cancelar();
    }
    
    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].preco;
            

            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute('onclick', "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/excluir.png';
            imgDelete.setAttribute('onclick' , "produto.deletar("+ this.arrayProdutos[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
            //este comando appendChild e como estivesse criando <td><img></td>

            console.log(this.arrayProdutos);
        }

    }

    excluirTudo(){
                
            let tbody = document.querySelector('#tbody');
         
            for(let i = 0; i < this.arrayProdutos.length;){
                if(this.arrayProdutos[i].id > i){
                    this.arrayProdutos.splice(i , 1);
                    tbody.deleteRow(i);
                }
            }

            console.log(this.arrayProdutos);
    }

    adicionar(produto) {
        produto.preco = parseFloat(produto.preco);
        this.arrayProdutos.push(produto);
        this.id++;

    }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id){
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }
    }

    preparaEdicao(dados){

        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
    
        document.getElementById('preco').value = dados.preco;

        document.getElementById('btn1').innerText = 'Atualizar';
    }

    lerDados(){
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto =  document.getElementById('produto').value;
        produto.preco =  document.getElementById('preco').value;

        return produto
    }

    validaCampos(produto){
        let msg = '';

        if(produto.nomeProduto == '') {
            msg += '- Informe o Nome do Produto! \n';
        }
        if(produto.preco == '') {
            msg += '- Informe o Preço do Produto! \n';
        }

        if(msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    cancelar() {
       document.getElementById('produto').value = '';
       document.getElementById('preco').value = '';

       document.getElementById('btn1').innerText = 'Salvar';

       this.editId = null;
    }

    mostrarTabela(){
        let openTable = document.getElementById('openTable');
        openTable.setAttribute('style', 'display: block');   
    }

    ocultarTabela(){
        let closeTable = document.getElementById('openTable');
        closeTable.setAttribute('style' , 'display: none');

    }

    deletar(id) {

        if(confirm('Deseja realmente excluir o ID ' + id)){
            let tbody = document.getElementById('tbody');

                for(let i = 0; i < this.arrayProdutos.length; i++){
                    if(this.arrayProdutos[i].id == id){
                        this.arrayProdutos.splice(i , 1);
                        tbody.deleteRow(i);
                    }
                }
        }
    
        console.log(this.arrayProdutos);
    }

}

let produto = new Produto();