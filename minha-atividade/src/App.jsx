import React, { useState } from 'react';
import ListaDeTarefas from './components/ListaDeTarefas';

function App() {
  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      texto: 'Estudar React',
      concluida: false
    },
    {
      id: 2,
      texto: 'Fazer a atividade',
      concluida: false
    },
    {
      id: 3,
      texto: 'Entregar o trabalho',
      concluida: true
    }
  ]);

  function adicionarTarefa(texto) {
    const novaTarefa = {
      id: Date.now(),
      texto: texto,
      concluida: false
    };

    setTarefas([...tarefas, novaTarefa]);
  }

  function concluirTarefa(id) {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa
      )
    );
  }

  function removerTarefa(id) {
    setTarefas(
      tarefas.filter((tarefa) => tarefa.id !== id)
    );
  }

  return (
    <div className="app">
      <ListaDeTarefas
        tarefas={tarefas}
        adicionarTarefa={adicionarTarefa}
        concluirTarefa={concluirTarefa}
        removerTarefa={removerTarefa}
      />
    </div>
  );
}

export default App;