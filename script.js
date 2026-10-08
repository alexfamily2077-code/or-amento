let itens = [];

function adicionarItem() {

    const descricao = document.getElementById("descricao").value.trim();
    const quantidade = Number(document.getElementById("quantidade").value);
    const valor = Number(document.getElementById("valor").value);

    if (descricao === "") {
        alert("Digite o nome do produto ou serviço.");
        return;
    }

    if (quantidade <= 0 || valor < 0 || isNaN(valor)) {
        alert("Digite uma quantidade e um valor válidos.");
        return;
    }

    const item = {
        descricao: descricao,
        quantidade: quantidade,
        valor: valor
    };

    itens.push(item);

    atualizarTabela();

    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "1";
    document.getElementById("valor").value = "";

    document.getElementById("descricao").focus();
}


function atualizarTabela() {

    const tabela = document.getElementById("listaItens");
    const mensagem = document.getElementById("mensagemVazia");

    tabela.innerHTML = "";

    if (itens.length === 0) {
        mensagem.style.display = "block";
        calcularOrcamento();
        return;
    }

    mensagem.style.display = "none";

    itens.forEach((item, indice) => {

        const total = item.quantidade * item.valor;

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${item.descricao}</td>
            <td>${item.quantidade}</td>
            <td>${formatarMoeda(item.valor)}</td>
            <td>${formatarMoeda(total)}</td>
            <td>
                <button 
                    class="remover"
                    onclick="removerItem(${indice})">
                    Remover
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });

    calcularOrcamento();
}


function removerItem(indice) {

    itens.splice(indice, 1);

    atualizarTabela();
}


function calcularOrcamento() {

    let subtotal = 0;

    itens.forEach(item => {
        subtotal += item.quantidade * item.valor;
    });

    let porcentagemDesconto = Number(
        document.getElementById("desconto").value
    );

    if (isNaN(porcentagemDesconto)) {
        porcentagemDesconto = 0;
    }

    if (porcentagemDesconto < 0) {
        porcentagemDesconto = 0;
    }

    if (porcentagemDesconto > 100) {
        porcentagemDesconto = 100;
    }

    const valorDesconto =
        subtotal * (porcentagemDesconto / 100);

    const totalFinal =
        subtotal - valorDesconto;

    document.getElementById("subtotal").textContent =
        formatarMoeda(subtotal);

    document.getElementById("valorDesconto").textContent =
        formatarMoeda(valorDesconto);

    document.getElementById("totalFinal").textContent =
        formatarMoeda(totalFinal);
}


function limparOrcamento() {

    itens = [];

    document.getElementById("desconto").value = "0";

    atualizarTabela();
}


function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}