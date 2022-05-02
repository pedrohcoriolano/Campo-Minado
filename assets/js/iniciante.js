var tabuleiro = []  
var tela = document.querySelector('#campo');
var lista_botao_achados = []

function imprimir() {
    
    for (var contador_linhas = 0; contador_linhas < 8; contador_linhas++) {
        tabuleiro[contador_linhas] = []
    }
    
    for (var contador_linhas = 0; contador_linhas < 8; contador_linhas++) {
        for (var contador_colunas = 0; contador_colunas < 10; contador_colunas++) {

            tabuleiro[contador_linhas][contador_colunas] = `<input type="button" value=" " id='item${contador_linhas}${contador_colunas}' onclick='tecla_apertada(${contador_linhas},${contador_colunas})'></input>`

            tela.innerHTML += tabuleiro[contador_linhas][contador_colunas]
    
        }
    
        tela.innerHTML += "<br />"

    }

}

function tecla_apertada (num1, num2) {
    var botao_escolhido = document.querySelector(`#item${num1}${num2}`)
    console.log(botao_escolhido)
    gerar(botao_escolhido)
}

var lista_bombas = []

var vezes = 0 

function gerar(botao) {
    var botao_cima = botao
    
    while (vezes < 10) {
        var num_ale = Math.floor(Math.random()*8)
        var num_ale2 = Math.floor(Math.random()*10)

        var botao_aleatorio = document.querySelector(`#item${num_ale}${num_ale2}`)

        if (!lista_bombas.includes(botao_aleatorio)) {
            if(botao_aleatorio !== botao) {
                lista_bombas[vezes] = document.querySelector(`#item${num_ale}${num_ale2}`)
                vezes++
            } 

        }
    }
    bomba(lista_bombas, botao_cima)
} 


function bomba(lista, botao) {
    if (lista.includes(botao)) {
        botao.value = '💣'
        setTimeout(confirmacao, 300)
    } else {
        botao.style.backgroundColor = 'green'
        botao.value = 0
        botao.setAttribute('disabled', 'disabled')

        //ganhar
        lista_botao_achados.push(botao)
        if (lista_botao_achados.length == 70) {
            ganhou()
        }
    }
}

function confirmacao() {
    alert('Você perdeu!!!')
    var confirma = confirm('Deseja reiniciar?')

    if (confirma == true) {
        alert('O jogo irá reiniciar')
        location.reload()
    } else {
        alert('Você será redirecionado para o menu')
        location.href = '../index.html'
    }
}

function ganhou() {
    alert('Parabéns, você ganhou!!!!')
    var confirma = confirm('Deseja reiniciar?')

    if (confirma == true) {
        alert('O jogo irá reiniciar')
        location.reload()
    } else {
        alert('Você será redirecionado para o menu')
        location.href = '../index.html'
    }
}