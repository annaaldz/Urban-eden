document.addEventListener('DOMContentLoaded', () => {
  const botoes = document.querySelectorAll('.filter-button');
  const plantas = document.querySelectorAll('.plant-card');

  botoes.forEach(botao => {
    botao.addEventListener('click', () => {
      const filtro = botao.getAttribute('data-filter');

      // Remove classe ativa de todos
      botoes.forEach(b => b.classList.remove('active'));
      botao.classList.add('active');

      plantas.forEach(planta => {
        const categorias = planta.getAttribute('data-category');

        if (filtro === 'todas') {
          planta.style.display = 'block';
        } else if (categorias.includes(filtro)) {
          planta.style.display = 'block';
        } else {
          planta.style.display = 'none';
        }
      });
    });
  });
});