const botaoBuscar = document.getElementById("search")
const botaoListar = document.getElementById("list")
const botaoCadastro = document.getElementById("post")
const botaoDeletar = document.getElementById("delete")
const botoes = [botaoBuscar, botaoListar, botaoCadastro, botaoDeletar];
const botaoVoltar = document.getElementById("voltar")


botaoVoltar.style.visibility = "hidden";

botaoListar.addEventListener("click", () => {
    fetch("/api/produtos/listar", {method:"GET"})
        .then(resposta => {
            if (resposta.ok) {

                botoes.forEach(e => e.style.visibility = "hidden");
                botaoVoltar.style.visibility = "visible";

                botaoVoltar.addEventListener("click", () => {
                    botoes.forEach(e => e.style.visibility = "visible");
                    if (botoes[0] && botoes[0].checkVisibility() === true){
                        botaoVoltar.style.visibility = "hidden";



                    }else{
                        botaoVoltar.style.visibility = "visible";
                    }
                })

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