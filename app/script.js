// Função assincrona que busca dados em um API em formato JSON
async function buscaEndereco(cep) {
    // Armazena ID de erro, utilizada para CEP incorreto
    var mensagemErro = document.querySelector("#erro")
    mensagemErro.innerHTML = "";
  
    try {
      var consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      var consultaCepConvertida = await consultaCep.json();
  
      // Se CEP estiver incorreto
      if (consultaCepConvertida.erro) {
        throw Error("CEP não existente!");
      }
  
      // Armazena ID's de Cidade, Logradouro e estado
      var logradouro = document.querySelector('#endereco');
      var bairro = document.querySelector('#bairro');
      var cidade = document.querySelector('#cidade');
      var estado = document.querySelector('#estado');
      
      // Retorna no formulário os valores referentes ao CEP digitado
      logradouro.value = consultaCepConvertida.logradouro;
      bairro.value = consultaCepConvertida.bairro;
      cidade.value = consultaCepConvertida.localidade;
      estado.value = consultaCepConvertida.uf
  
      return consultaCepConvertida;
    } catch (erro) {
      mensagemErro.innerHTML = `<p>CEP inválido. Digite um CEP válido!</p>`
      console.log(erro);
    }
  }
  
  // Armazena ID CEP e busca valores referentes ao mesmo, como logradouro, bairro, cidade e estado
  var cep = document.querySelector("#cep");
  cep.addEventListener("focusout", () => buscaEndereco(cep.value));
  