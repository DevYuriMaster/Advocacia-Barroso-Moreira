const campoCPF = document.getElementById('campoCPF');
const campoTelefone = document.getElementById('campoTelefone');
const campoSenha = document.getElementById('campoSenha');

campoCPF.addEventListener("input", function (e) {
  const valor = e.target.value;
  const regex = /\D/g; // Expressão regular para encontrar caracteres não numéricos

  if (regex.test(valor)) {
    // Remove caracteres não numéricos do valor
    campoCPF.value = valor.replace(regex, "");
  }
});

campoSenha.addEventListener("input", function (e) {
  const valor = e.target.value;
  const regex = /[^a-zA-Z0-9]/g; // Expressão regular para encontrar caracteres não alfanuméricos

  if (regex.test(valor)) {
    // Remove caracteres não alfanuméricos do valor
    campoSenha.value = valor.replace(regex, "");
  }
});

campoTelefone.addEventListener("input", function (e) {
  const valor = e.target.value;
  const regex = /\D/g; // Expressão regular para encontrar caracteres não numéricos

  if (regex.test(valor)) {
    // Remove caracteres não numéricos do valor
    campoTelefone.value = valor.replace(regex, "");
  }
});


function validarTelefone() {
  var telefone = document.getElementById("telefone").value;
  var regex = /^\d{10}$/; // Regex para validar um número de telefone com 10 dígitos

  if (regex.test(telefone)) {
    alert("Número de telefone válido!");
  } else {
    alert("Número de telefone inválido!");
  }
}


