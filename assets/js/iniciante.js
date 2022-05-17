var tabuleiro = []  
var tela = document.querySelector('#campo');
var tela_tempo = document.querySelector('#tempo')
var lista_botao_achados = []
var num_vezes = 1
var segundos = 0
var minutos = 0

tela_tempo.innerHTML = `tempo: ${minutos} minuto(s) | ${segundos} segundo(s)`

function tempo() {
    setInterval(function() {
        if(segundos == 60) {
            segundos = 0
            minutos++
        }
        segundos++
		tela_tempo.innerHTML = `tempo: ${minutos} minuto(s) | ${segundos} segundo(s)`
    }, 1000)
}


function imprimir() {
    
    for (var contador_linhas = 0; contador_linhas < 8; contador_linhas++) {
        tabuleiro[contador_linhas] = []
    }
    
    for (var contador_linhas = 0; contador_linhas < 8; contador_linhas++) {
        for (var contador_colunas = 0; contador_colunas < 10; contador_colunas++) {

            tabuleiro[contador_linhas][contador_colunas] = `<input type="button" value=" " id='item${contador_linhas}-${contador_colunas}' onclick='tecla_apertada(${contador_linhas},${contador_colunas})' oncontextmenu='alerta(${contador_linhas},${contador_colunas})'></input>`
            
            
            tela.innerHTML += tabuleiro[contador_linhas][contador_colunas]
        }
        
        tela.innerHTML += "<br />"
        
    }
    
}


var primeiro_clique = 0

document.addEventListener('contextmenu', (evento) => {
    evento.preventDefault()
})

function alerta(n1,n2) {
    document.querySelector(`#item${n1}-${n2}`).classList.toggle('bandeira')
    if (document.querySelector(`#item${n1}-${n2}`).classList == 'bandeira') {
        document.querySelector(`#item${n1}-${n2}`).style.backgroundColor = 'red'
        document.querySelector(`#item${n1}-${n2}`).style.color = 'red'
    } else {
        document.querySelector(`#item${n1}-${n2}`).style.backgroundColor = 'white'
        document.querySelector(`#item${n1}-${n2}`).style.color = 'white'
    }
}



function tecla_apertada (num1, num2) {
    var botao_escolhido = document.querySelector(`#item${num1}-${num2}`)
    if (primeiro_clique==0){
    gerar(botao_escolhido)
    tempo()
    }
    bomba(lista_bombas, num1, num2)
}


var lista_bombas = []

var vezes = 0 

function gerar(botao) {
    primeiro_clique = 1
    
    while (vezes < 10) {
        var num_ale = Math.floor(Math.random()*8)
        var num_ale2 = Math.floor(Math.random()*10)

        var botao_aleatorio = document.querySelector(`#item${num_ale}-${num_ale2}`)

        if (!lista_bombas.includes(botao_aleatorio)) {
            if(botao_aleatorio !== botao) {
                lista_bombas[vezes] = document.querySelector(`#item${num_ale}-${num_ale2}`)
                document.querySelector(`#item${num_ale}-${num_ale2}`).style.color = 'white'
                document.querySelector(`#item${num_ale}-${num_ale2}`).value = '#'
                vezes++
            } 

        }
    }

    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 10; j++) {
            if(document.querySelector(`#item${i}-${j}`).value == '#'){
                if(document.querySelector(`#item${i-1}-${j-1}`) !== null && document.querySelector(`#item${i-1}-${j-1}`).value !== '#') {
                    document.querySelector(`#item${i-1}-${j-1}`).value++
                    document.querySelector(`#item${i-1}-${j-1}`).style.color = 'white'
                }
                if(document.querySelector(`#item${i-1}-${j+1}`) !== null && document.querySelector(`#item${i-1}-${j+1}`).value !== '#'){
                    document.querySelector(`#item${i-1}-${j+1}`).value++
                    document.querySelector(`#item${i-1}-${j+1}`).style.color = 'white'
                }
                if(document.querySelector(`#item${i}-${j-1}`) !== null && document.querySelector(`#item${i}-${j-1}`).value !== '#'){
                    document.querySelector(`#item${i}-${j-1}`).value++
                    document.querySelector(`#item${i}-${j-1}`).style.color = 'white'
                }
                if(document.querySelector(`#item${i}-${j+1}`) !== null && document.querySelector(`#item${i}-${j+1}`).value !== '#'){
                    document.querySelector(`#item${i}-${j+1}`).value++
                    document.querySelector(`#item${i}-${j+1}`).style.color = 'white'   
                }
                if(document.querySelector(`#item${i-1}-${j}`) !== null && document.querySelector(`#item${i-1}-${j}`).value !== '#'){
                    document.querySelector(`#item${i-1}-${j}`).value++
                    document.querySelector(`#item${i-1}-${j}`).style.color = 'white'   
                }
                if(document.querySelector(`#item${i+1}-${j}`) !== null && document.querySelector(`#item${i+1}-${j}`).value !== '#'){
                    document.querySelector(`#item${i+1}-${j}`).value++
                    document.querySelector(`#item${i+1}-${j}`).style.color = 'white'   
                }
                if(document.querySelector(`#item${i+1}-${j-1}`) !== null && document.querySelector(`#item${i+1}-${j-1}`).value !== '#'){
                    document.querySelector(`#item${i+1}-${j-1}`).value++
                    document.querySelector(`#item${i+1}-${j-1}`).style.color = 'white'   
                }
                if(document.querySelector(`#item${i+1}-${j+1}`) !== null && document.querySelector(`#item${i+1}-${j+1}`).value !== '#'){
                    document.querySelector(`#item${i+1}-${j+1}`).value++
                    document.querySelector(`#item${i+1}-${j+1}`).style.color = 'white'   
                }
            } 
        }
    }
} 

function bomba(lista, num1, num2) {
    if (lista.includes(document.querySelector(`#item${num1}-${num2}`))) {
        document.querySelector(`#item${num1}-${num2}`).style.backgroundColor = 'darkred';
        perdeu()
    } else {
        limpar(num1,num2) 
    }
}


function limpar(n1,n2) {
    
    document.querySelector(`#item${n1}-${n2}`).style.backgroundColor = 'darkgreen'
    document.querySelector(`#item${n1}-${n2}`).disabled = true
    
    if (!lista_botao_achados.includes(document.querySelector(`#item${n1}-${n2}`))) {
        lista_botao_achados.push(document.querySelector(`#item${n1}-${n2}`))
    }
    
    if (document.querySelector(`#item${n1}-${n2}`).value == " ") {
        for (var i =  n1-1; i <= n1+1; i++) {
            for (var j = n2-1; j <= n2+1; j++) {
                if(i >= 0 && i < 8 && j >= 0 && j < 10){
                    var quadrado = document.querySelector(`#item${i}-${j}`)
                    if (quadrado.className !== 'aberto' && quadrado !== null) {
                        quadrado.className = 'aberto'
                        quadrado.style.backgroundColor = 'darkgreen'
                        quadrado.disabled = true
                        if (!lista_botao_achados.includes(quadrado)) {
                            lista_botao_achados.push(quadrado)
                        }
                        limpar(i,j)
                    } 
                }
            }
        }
    }
    if (lista_botao_achados.length == 70) {
        ganhou()
    }
}

function perdeu() {
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