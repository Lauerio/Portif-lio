document.addEventListener('DOMContentLoaded', () => {
  const tabuleiros = [
    [
      ['C', 'X', 'S', 'A', 'B', 'O', 'R', 'A'],
      ['B', 'O', 'T', 'O', 'S', 'I', 'R', 'I'],
      ['L', 'P', 'Z', 'E', 'M', 'A', 'G', 'B'],
      ['S', 'F', 'T', 'O', 'C', 'U', 'L', 'Z'],
      ['P', 'Y', 'W', 'X', 'D', 'E', 'N', 'V']
    ],
    [
      ['C', 'A', 'S', 'T', 'O', 'R', 'A', 'L'],
      ['P', 'W', 'T', 'A', 'C', 'U', 'R', 'C'],
      ['L', 'A', 'C', 'A', 'J', 'K', 'L', 'U'],
      ['C', 'U', 'R', 'A', 'S', 'F', 'L', 'C'],
      ['A', 'T', 'Z', 'E', 'O', 'R', 'L', 'A']
    ],
    [
      ['G', 'A', 'T', 'O', 'R', 'A', 'I', 'O'],
      ['P', 'L', 'S', 'A', 'S', 'L', 'Q', 'Z'],
      ['L', 'C', 'U', 'R', 'P', 'T', 'D', 'G'],
      ['M', 'A', 'T', 'I', 'E', 'U', 'M', 'O'],
      ['C', 'U', 'R', 'U', 'P', 'I', 'R', 'A']
    ],
    [
      ['V', 'A', 'C', 'I', 'L', 'T', 'O', 'P'],
      ['S', 'B', 'S', 'R', 'O', 'J', 'U', 'T'],
      ['A', 'Z', 'Y', 'A', 'P', 'E', 'K', 'O'],
      ['L', 'C', 'U', 'N', 'C', 'B', 'C', 'X'],
      ['D', 'J', 'F', 'R', 'S', 'I', 'H', 'Q']
    ],
    [
      ['R', 'T', 'G', 'M', 'U', 'L', 'A', 'F'],
      ['P', 'M', 'C', 'P', 'S', 'X', 'K', 'L'],
      ['Y', 'U', 'O', 'Q', 'B', 'W', 'V', 'N'],
      ['E', 'U', 'Z', 'T', 'L', 'M', 'J', 'S'],
      ['B', 'H', 'E', 'L', 'G', 'O', 'D', 'E']
    ]
  ];

 const palavras = ['BOTO', 'CUCA', 'CURUPIRA', 'SACI', 'MULA'];
  const imagens = [
    'img/boto.png',
    'img/cuca.png',
    'img/curupira.png',
    'img/saci.png',
    'img/mula.png'
  ];

  const container = document.querySelector('.wordSearch');

  function criarTabuleiro(tab) {
    const tabela = document.createElement('table');
    tabela.classList.add('puzzle-table');

    for (let linha of tab) {
      const tr = document.createElement('tr');
      for (let letra of linha) {
        const td = document.createElement('td');
        td.textContent = letra;
        td.addEventListener('click', () => {
          td.classList.toggle('selected');
        });
        tr.appendChild(td);
      }
      tabela.appendChild(tr);
    }
    return tabela;
  }

  function criarBloco(tabuleiro, palavra, imagemSrc) {
    const bloco = document.createElement('div');
    bloco.classList.add('bloco');

    const layout = document.createElement('div');
    layout.classList.add('layout-lado-a-lado');

    const img = document.createElement('img');
    img.src = imagemSrc;
    img.alt = palavra;
    img.classList.add('img-personagem');

    const conteudo = document.createElement('div');
    conteudo.classList.add('conteudo');

    const titulo = document.createElement('p');
    titulo.textContent = `Encontre a palavra: ${palavra}`;
    conteudo.appendChild(titulo);

    const tabela = criarTabuleiro(tabuleiro);
    conteudo.appendChild(tabela);

    const btn = document.createElement('button');
    btn.textContent = 'Confirmar';
    conteudo.appendChild(btn);

    const resultado = document.createElement('div');
    resultado.classList.add('resultado');
    conteudo.appendChild(resultado);

btn.addEventListener('click', () => {
  const selecionadas = tabela.querySelectorAll('td.selected');
  let palavraFormada = '';
  const coords = [];

  selecionadas.forEach(td => {
    palavraFormada += td.textContent;
    const cell = td.closest('table');
    const linha = td.parentElement.rowIndex;
    const coluna = td.cellIndex;
    coords.push([linha, coluna]);
  });

  const alinhadas = verificarSequencia(coords);

  if (palavraFormada === palavra && alinhadas) {
    resultado.textContent = `✅ Parabéns! Encontrou ${palavra}`;
  } else {
    resultado.textContent = `❌ "${palavraFormada}" não é ${palavra} ou está fora de sequência`;
  }

  selecionadas.forEach(td => td.classList.remove('selected'));
});

    layout.appendChild(img);
    layout.appendChild(conteudo);
    bloco.appendChild(layout);

    return bloco;
  }

  for (let i = 0; i < tabuleiros.length; i++) {
    const bloco = criarBloco(tabuleiros[i], palavras[i], imagens[i]);
    container.appendChild(bloco);
  }
});

function verificarSequencia(coords) {
  if (coords.length < 2) return true;

  const [dx, dy] = [
    coords[1][0] - coords[0][0], // variação nas linhas
    coords[1][1] - coords[0][1]  // variação nas colunas
  ];

  for (let i = 1; i < coords.length; i++) {
    const [prevX, prevY] = coords[i - 1];
    const [currX, currY] = coords[i];

    if (currX - prevX !== dx || currY - prevY !== dy) {
      return false;
    }
  }

  return true;
}

function trocarCor(botao) {
  if (botao.textContent === "🌒") {
    botao.textContent = "☀️";
    document.body.style.backgroundColor = "#121212";
    document.querySelectorAll('.bloco').forEach(el => {
  el.style.backgroundColor = "#71797a";
});
  } else {
    botao.textContent = "🌒";
    document.body.style.backgroundColor = "#efc8b1";
    document.querySelectorAll('.bloco').forEach(el => {
  el.style.backgroundColor = "#c1dde0";
});
  }
}


