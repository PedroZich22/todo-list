import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import plus from "./assets/plus.svg";
import clipboard from "./assets/clipboard.svg";

import { Header } from "./components/Header";

import styles from "./App.module.css";
import { Task } from "./components/Task";

interface Task {
  id: string;
  name: string;
  isComplete: boolean;
}

export function App() {
  const [input, setInput] = useState("");
  const [listTasks, setListTasks] = useState<Task[]>([]);

  function handleDeleteTask(id: string) {
    const newTasks = listTasks.filter((task) => task.id !== id);
    setListTasks(newTasks);
  }

  function handleCompleteTask(id: string) {
    const newTasks = listTasks.map((task) =>
      task.id === id ? { ...task, isComplete: !task.isComplete } : task
    );
    setListTasks(newTasks);
  }

  function createTask(input: string) {
    const task: Task = {
      id: uuidv4(),
      name: input,
      isComplete: false,
    };

    setListTasks([...listTasks, task]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (input === "") {
      alert("Digite uma tarefa");
      return;
    }

    createTask(input);
  }

  function completedTasks() {
    const completedTasks = listTasks.filter((task) => task.isComplete);
    return completedTasks.length;
  }

  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.container}>
        <form onSubmit={handleSubmit}>
          <input
            id="input"
            type="text"
            placeholder="Adicione uma nova tarefa"
            onChange={(e) => setInput(e.target.value)}
          />
          <button id="create-btn" type="submit">
            Criar
            <img className={styles.plus} src={plus} alt="plus" />
          </button>
        </form>

        <div className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.counters}>
              <span>Tarefas Criadas</span>
              <div className={styles.counter}>{listTasks.length}</div>
            </div>

            <div className={styles.counters}>
              <span>Concluídas</span>
              <div className={styles.counter}>
                {listTasks.length === 0
                  ? 0
                  : `${completedTasks()} de ${listTasks.length}`}
              </div>
            </div>
          </div>

          <div className={styles.listTasks}>
            {listTasks.length === 0 ? (
              <div className={styles.empty}>
                <img src={clipboard} alt="clipboard" />
                <span>Você ainda não tem tarefas cadastradas</span>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div>
            ) : (
              <ul>
                {listTasks.map((task) => (
                  <Task
                    key={task.id}
                    id={task.id}
                    name={task.name}
                    isComplete={task.isComplete}
                    handleDeleteTask={handleDeleteTask}
                    handleCompleteTask={handleCompleteTask}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
