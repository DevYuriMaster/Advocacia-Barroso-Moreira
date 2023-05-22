function redirecionar(event){
    event.preventDefault();
    var formularioCadastro = document.getElementById('formCadastro');
    var destino = formularioCadastro.getAttribute('action');
    window.location.href = destino;
} 