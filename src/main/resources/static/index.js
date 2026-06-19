const botaoBuscar = document.getElementById("search")
const botaoListar = document.getElementById("list")
const botaoCadastro = document.getElementById("post")
const botaoDeletar = document.getElementById("delete")
const botoes = [botaoBuscar, botaoListar, botaoCadastro, botaoDeletar];
const botaoVoltar = document.getElementById("voltar")


botaoVoltar.style.visibility = "hidden";

botaoVoltar.addEventListener("click", () => {
    botoes.forEach(e => e.style.visibility = "visible");
    if (botoes[0] && botoes[0].checkVisibility() === true){
        botaoVoltar.style.visibility = "hidden";

    }else{
        botaoVoltar.style.visibility = "visible";
    }
})

botaoListar.addEventListener("click", () => {
    fetch("/api/produtos/listar", {method:"GET"})
        .then(resposta => {
            if (resposta.ok) {

                botoes.forEach(e => e.style.visibility = "hidden");
                botaoVoltar.style.visibility = "visible";

                resposta.json().then(dados => {
                    const corpoTabela = document.getElementById("corpo_tabela");
                    corpoTabela.innerHTML = "";

                    dados.forEach(item => {
                        const linha = document.createElement("tr");
                        linha.innerHTML = `
                            <td>${item.id}</td>          
                            <td>${item.nome}</td>        
                            <td>${item.valor}</td>       
                            <td>${item.descricao}</td>   
                            <td>${item.imagem}</td>      
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

//colocar a tabela seguindo as instruções na area de trabalho
//ver se o passo acima realmente ta funcionando implementando a funçaõ de cadastro de novos itens no banco de dados.

botaoBuscar.addEventListener("click", () =>{
    fetch("/api/produtos", {method:"/{id}"})
})
botaoCadastro.addEventListener("click", ()=>{
    fetch("/api/produtos", {method:"POST"})
})
botaoDeletar.addEventListener("click", ()=>{
    fetch("/api/produtos", {method:"DELETE"})
})