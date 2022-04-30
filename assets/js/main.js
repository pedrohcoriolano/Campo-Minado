function proxima_pagina (nivel) {
    if (nivel === 'iniciante') {
        location.href = 'niveis/iniciante.html'
    } else if (nivel === 'intermediario') {
        location.href = 'niveis/intermediario.html'
    } else {
        location.href = 'niveis/avancado.html'
    }
}