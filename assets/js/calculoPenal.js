// Captura os elementos HTML relevantes
const dataCondenacao = document.getElementById("data-condenacao");
const tempoCondenacao = document.getElementById("tempo-condenacao");
const remicao = document.getElementById("remicao");
const detracao = document.getElementById("detracao");
const regimeAtual = document.getElementById("regime-atual");
const resultado = document.getElementById("resultado");

// Função para atualizar o resultado na tela
function atualizarTela(valor) {
  resultado.innerText = valor;

}

// Função para calcular a pena
function calcularPena() {
  // Captura os valores dos campos de entrada
  const dataCondenacaoValor = dataCondenacao.value;
  const tempoCondenacaoValor = Number(tempoCondenacao.value);
  const remicaoValor = Number(remicao.value);
  const detracaoValor = Number(detracao.value);
  const regimeAtualValor = regimeAtual.value;

  // Realiza o cálculo da pena de acordo com as regras específicas do sistema de execução penal brasileiro
  let pena = new Date(dataCondenacaoValor);
  pena.setFullYear(pena.getFullYear() + tempoCondenacaoValor);
  pena.setDate(pena.getDate() - detracaoValor);
  pena.setDate(pena.getDate() - remicaoValor);
  
  if (regimeAtualValor === "semiaberto") {
    if (pena.getFullYear() >= 2) {
      pena.setFullYear(pena.getFullYear() - 2);
      regimeAtual.innerText = "Fechado";
    }
  } else if (regimeAtualValor === "aberto") {
    if (pena.getFullYear() >= 1) {
      pena.setFullYear(pena.getFullYear() - 1);
      regimeAtual.innerText = "Semiaberto";
    }
  }

  // Converte a data da pena para uma string formatada
  const dia = pena.getDate().toString().padStart(2, "0");
  const mes = (pena.getMonth() + 1).toString().padStart(2, "0");
  const ano = pena.getFullYear();
  const dataFormatada = `${dia}/${mes}/${ano}`;

  // Chama a função para atualizar o resultado na tela
  atualizarTela(`Data de término da pena: ${dataFormatada}`);
}