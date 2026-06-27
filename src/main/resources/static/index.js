const botaoBuscar = document.getElementById("search")
const botaoListar = document.getElementById("list")
const botaoCadastro = document.getElementById("post")
const botaoDeletar = document.getElementById("delete")
const botoes = [botaoBuscar, botaoListar, botaoCadastro, botaoDeletar];
const botaoVoltar = document.getElementById("voltar")
const tabela = document.getElementById("tabela");
const corpoTabela = document.getElementById("corpo_tabela")
const formulario = document.getElementById("formulario")
const cadastrar = document.getElementById("cadastrar")

function voltar(a) {
    if (a === "mostrar"){
        botaoVoltar.style.visibility = "visible";
    }
    else if (a === "esconder"){
        botaoVoltar.style.visibility = "hidden";
    }
}
function botoesPrincipais(a) {
    if (a === "mostrar"){
        botoes.forEach(e => e.style.visibility = "visible");
    }
    else if (a === "esconder"){
        botoes.forEach(e => e.style.visibility = "hidden");
    }
}


botaoListar.addEventListener("click", () => {
    fetch("/api/produtos/listar", {method:"GET"})
        .then(resposta => {
            if (resposta.ok) {
                voltar("mostrar")
                botoesPrincipais("esconder")

                tabela.style.visibility = "visible"
                corpoTabela.style.visibility = "visible"

                botaoVoltar.onclick = () =>{
                    tabela.style.visibility = "hidden"
                    corpoTabela.style.visibility = "hidden"
                }
                resposta.json().then(dados => {
                    const corpoTabela = document.getElementById("corpo_tabela");
                    corpoTabela.innerHTML = "";
                    corpoTabela.style.visibility = "visible";

                    dados.forEach(item => {
                        const linha = document.createElement("tr");
                        linha.innerHTML = `
                            <td>${item.id}</td>          
                            <td>${item.nome}</td>        
                            <td>${item.valor}</td>           
                            <td>${item.estoque}</td>     
                        `;
                        corpoTabela.appendChild(linha);
                    });
                });

            }else{
                alert("Falha em listar usuários.")
            }
        })
})
botaoBuscar.addEventListener("click", () =>{
    fetch("/api/produtos", {method:"/{id}"})
})
botaoCadastro.addEventListener("click", ()=>{
    voltar("mostrar");
    botoesPrincipais("esconder");
    formulario.style.visibility = "visible"

    botaoVoltar.onclick = () => {
        formulario.style.visibility = "hidden"
    }
    cadastrar.addEventListener ( "click", () => {
        fetch("/api/produtos", {method:"POST"})
            .then(resposta =>{
            //Terminar essa parte de cadastro e descobrir porque tá gerando requisição dupla
            })
    })
})
botaoDeletar.addEventListener("click", ()=>{
    fetch("/api/produtos", {method:"DELETE"})
})
botaoVoltar.addEventListener("click", () => {
    function botoesVisiveis() {
        return botoes[0] && botoes[0].checkVisibility()
    }

    botoes.forEach(e => e.style.visibility = "visible");
    if (botoesVisiveis() === true){
        voltar("esconder")

    }else{
        voltar("mostrar")
    }
})