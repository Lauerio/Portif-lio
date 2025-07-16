document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contatoForm');
  const toggle = document.getElementById('theme-toggle');
  const body = document.body;

  form.addEventListener('submit', function (event) {
    const nome = form.nome.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !mensagem) {
      alert('Por favor, preencha os campos obrigatórios.');
      event.preventDefault();
    } else {
      alert('Mensagem enviada com sucesso! (Simulado)');
    }
  });
});

function trocarCor(botao) {
    const imagemBotao = botao.querySelector('img');
    const imgSol = 'img/sol.png';
    const imgLua = 'img/lua.png';

    if (document.body.classList.contains('light-theme')) {
        document.body.classList.remove('light-theme');

        imagemBotao.src = imgSol;
        imagemBotao.alt = "Modo Claro"; 

    } else {
        document.body.classList.add('light-theme');

        imagemBotao.src = imgLua;
        imagemBotao.alt = "Modo Escuro"; 
    }
}