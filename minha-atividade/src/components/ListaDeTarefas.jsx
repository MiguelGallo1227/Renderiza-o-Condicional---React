import React, { useState } from 'react';

function ListaDeTarefas({
  tarefas,
  adicionarTarefa,
  concluirTarefa,
  removerTarefa
}) {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState('todas');

  function adicionar() {
    if (novaTarefa.trim() === '') {
      return;
    }

    adicionarTarefa(novaTarefa.trim());
    setNovaTarefa('');
  }

  function pressionarEnter(event) {
    if (event.key === 'Enter') {
      adicionar();
    }
  }

  const tarefasFiltradas = tarefas.filter((tarefa) => {
    const correspondeBusca = tarefa.texto
      .toLowerCase()
      .includes(busca.toLowerCase());

    if (filtro === 'pendentes') {
      return !tarefa.concluida && correspondeBusca;
    }

    if (filtro === 'concluidas') {
      return tarefa.concluida && correspondeBusca;
    }

    return correspondeBusca;
  });

  const quantidadeConcluidas = tarefas.filter(
    (tarefa) => tarefa.concluida
  ).length;

  const quantidadePendentes = tarefas.filter(
    (tarefa) => !tarefa.concluida
  ).length;

  return (
    <div className="lista-container">

      <header className="cabecalho">
        <h1>Lista de Tarefas</h1>
        <p>Organize suas atividades de forma simples</p>
      </header>

      <div className="formulario">
        <input
          type="text"
          placeholder="Digite uma nova tarefa..."
          value={novaTarefa}
          onChange={(event) => setNovaTarefa(event.target.value)}
          onKeyDown={pressionarEnter}
        />

        <button onClick={adicionar}>
          + Adicionar
        </button>
      </div>

      <div className="estatisticas">
        <div className="estatistica">
          <strong>{tarefas.length}</strong>
          <span>Total</span>
        </div>

        <div className="estatistica">
          <strong>{quantidadePendentes}</strong>
          <span>Pendentes</span>
        </div>

        <div className="estatistica">
          <strong>{quantidadeConcluidas}</strong>
          <span>Concluídas</span>
        </div>
      </div>

      <div className="ferramentas">
        <input
          type="text"
          placeholder="Pesquisar tarefa..."
          value={busca}
          onChange={(event) => setBusca(event.target.value)}
        />

        <div className="filtros">
          <button
            className={filtro === 'todas' ? 'ativo' : ''}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>

          <button
            className={filtro === 'pendentes' ? 'ativo' : ''}
            onClick={() => setFiltro('pendentes')}
          >
            Pendentes
          </button>

          <button
            className={filtro === 'concluidas' ? 'ativo' : ''}
            onClick={() => setFiltro('concluidas')}
          >
            Concluídas
          </button>
        </div>
      </div>

      {tarefasFiltradas.length > 0 ? (
        <ul className="lista">
          {tarefasFiltradas.map((tarefa) => (
            <li
              key={tarefa.id}
              className={tarefa.concluida ? 'tarefa concluida' : 'tarefa'}
            >
              <div className="tarefa-conteudo">
                <button
                  className="check"
                  onClick={() => concluirTarefa(tarefa.id)}
                >
                  {tarefa.concluida ? '✓' : ''}
                </button>

                <span>{tarefa.texto}</span>
              </div>

              <button
                className="remover"
                onClick={() => removerTarefa(tarefa.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="vazia">
          <div className="icone-vazia">
            ✓
          </div>

          <h2>Nenhuma tarefa encontrada</h2>

          <p>
            {tarefas.length === 0
              ? 'Adicione uma nova tarefa para começar.'
              : 'Tente alterar o filtro ou a pesquisa.'}
          </p>
        </div>
      )}

    </div>
  );
}

export default ListaDeTarefas;