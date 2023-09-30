import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

import plus from "./assets/plus.svg";
import trash from "./assets/trash.svg";
import clipboard from "./assets/clipboard.svg";
import check from "./assets/check.svg";

import { Header } from "./components/Header";

import styles from "./App.module.css";

interface Task {
  id: string;
  name: string;
  isComplete: boolean;
}

export function App() {
  const [input, setInput] = useState("");
  const [listTasks, setListTasks] = useState<Task[]>([]);

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
                  <li key={task.id} className={task.isComplete ? styles.taskCompleted : styles.task}>
                    <div className={styles.checkboxBox}>
                      <input
                        type="checkbox"
                        checked={task.isComplete}
                        onChange={() => {
                          const newTasks = listTasks.map((item) =>
                            item.id === task.id
                              ? { ...item, isComplete: !item.isComplete }
                              : item
                          );
                          setListTasks(newTasks);
                        }}
                      />
                      <img src={check} alt="" />
                    </div>
                    <p>{task.name}</p>
                    <button
                      onClick={() => {
                        const newTasks = listTasks.filter(
                          (item) => item.id !== task.id
                        );
                        setListTasks(newTasks);
                      }}
                    >
                      <img src={trash} alt="trash" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
