document.addEventListener("DOMContentLoaded", () => {
  iniciarChecklist();
  configurarFormularioLuz();
});


function atualizarEstiloVisual(item) {
  const itemLista = item.closest('.checklist-item');
  if (itemLista) {
    const textoTarefa = itemLista.querySelector('.item-text');
    if (textoTarefa) {
      if (item.checked) {
        textoTarefa.classList.add('tarefa-concluida');
      } else {
        textoTarefa.classList.remove('tarefa-concluida');
      }
    }
  }
};

function salvarChecklist() {
  const itens = document.querySelectorAll('.checklist-list input[type="checkbox"], #checklist input[type="checkbox"], .checklist-box input[type="checkbox"]');
  const dadosChecklist = {};

  itens.forEach((item, index) => {
    const idIdentificador = item.id || `chk-automatico-${index}`;
    dadosChecklist[idIdentificador] = item.checked;
    
    atualizarEstiloVisual(item);
  });

  localStorage.setItem('urbanEdenChecklist', JSON.stringify(dadosChecklist));
};

function iniciarChecklist() {
  const dadosSalvos = localStorage.getItem('urbanEdenChecklist');
  const itens = document.querySelectorAll('.checklist-list input[type="checkbox"], #checklist input[type="checkbox"], .checklist-box input[type="checkbox"]');

  if (dadosSalvos) {
    const dadosChecklist = JSON.parse(dadosSalvos);
    
    itens.forEach((item, index) => {
      const idIdentificador = item.id || `chk-automatico-${index}`;
      if (dadosChecklist[idIdentificador] !== undefined) {
        item.checked = dadosChecklist[idIdentificador];
      }
      atualizarEstiloVisual(item);
    });
  };


  itens.forEach(item => {
    item.removeEventListener('change', salvarChecklist);
    item.addEventListener('change', salvarChecklist);
  });
};


function configurarFormularioLuz() {
  const formulario = document.getElementById('form-luz');
  const containerResultado = document.getElementById('resultado-planta');

  if (!formulario || !containerResultado) {
    console.error("Erro Urban Éden: Verifique se os IDs 'form-luz' e 'resultado-planta' estão no seu HTML.");
    return;
  };

  const sugestoesPlantas = {
    pouca: {
      nome: "Zamioculca ou Espada de São Jorge",
      dica: "Excelentes para cantos mais escuros, corredores ou escritórios. Sobrevivem bravamente com pouca luz e precisam de pouca rega."
    },
    indireta: {
      nome: "Jiboia, Maranta ou Monstrera (Costela-de-Adão)",
      dica: "Amam claridade perto de janelas, mas sem pegar sol direto nas folhas. É o ambiente perfeito para a maioria das plantas tropicais!"
    },
    direta: {
      nome: "Cactos, Suculentas ou Jade",
      dica: "Precisam de raios solares batendo diretamente nelas por algumas horas do dia para crescerem saudáveis. Cuidado para não exagerar na água."
    }
  };

  formulario.addEventListener('submit', function(evento) {
    evento.preventDefault(); 

    const opcaoSelecionada = document.querySelector('input[name="luz"]:checked');
    
    if (opcaoSelecionada) {
      const tipoLuz = opcaoSelecionada.value;
      const plantaIdeal = sugestoesPlantas[tipoLuz];

      containerResultado.innerHTML = `
        <strong>🌱 Recomendação: ${plantaIdeal.nome}</strong>
        <p>${plantaIdeal.dica}</p>
      `;
      
      containerResultado.style.display = 'block';
      containerResultado.style.marginTop = '20px';
      containerResultado.style.padding = '15px';
      containerResultado.style.borderRadius = '8px';
      containerResultado.style.backgroundColor = '#f4f9f4';
      containerResultado.style.borderLeft = '4px solid #2e7d32';
      containerResultado.style.boxSizing = 'border-box';
      containerResultado.style.width = '100%';
    }
  });
};
