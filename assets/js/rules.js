
function validarTelefone() {
    var telefone = document.getElementById("telefone").value;
    var regex = /^\d{10}$/; // Regex para validar um número de telefone com 10 dígitos
    
    if (regex.test(telefone)) {
      alert("Número de telefone válido!");
    } else {
      alert("Número de telefone inválido!");
    }
  }

