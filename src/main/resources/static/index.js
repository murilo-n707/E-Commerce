const container = document.querySelector(".box1")
const botaoBuscar = document.getElementById("search")
const botaoListar = document.getElementById("list")
const botaoCadastro = document.getElementById("post")
const botaoDeletar = document.getElementById("delete")

const botoes = [botaoBuscar, botaoListar, botaoCadastro, botaoDeletar];

botaoListar.addEventListener("click", () => {
    fetch("/api/produtos", {method:"GET"})
        .then(resposta => {
            if (resposta.ok) {
                botoes.forEach(e => e.style.visibility = "hidden");
                const botaoVoltar = document.createElement("button");
                container.style.position = "relative"

                botaoVoltar.style.position = "absolute";
                botaoVoltar.style.top = "20px"
                botaoVoltar.style.left = "20px"
                botaoVoltar.style.width = "100px"
                botaoVoltar.style.height = "25px"
                botaoVoltar.innerText = "Voltar"
                //Parei aqui, vou colocar um event listener no botao voltar para os botoes anteriores aparecerem, e então vou colocar a tabela.
                container.appendChild(botaoVoltar);

            }
        })
})
botaoBuscar.addEventListener("click", () =>{
    fetch("/api/produtos", {method:"/{id}"})
})
botaoCadastro.addEventListener("click", ()=>{
    fetch("/api/produtos", {method:"POST"})
})
botaoDeletar.addEventListener("click", ()=>{
    fetch("/api/produtos", {method:"DELETE"})
})