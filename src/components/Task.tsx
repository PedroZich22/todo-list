import styles from "./Task.module.css";

import trash from "../assets/trash.svg";
import check from "../assets/check.svg";

interface TaskProps {
  id: string;
  name: string;
  isComplete: boolean;
  handleDeleteTask: (id: string) => void;
  handleCompleteTask: (id: string) => void;
}

export function Task({
  id,
  name,
  isComplete,
  handleDeleteTask,
  handleCompleteTask,
}: TaskProps) {
  return (
    <li key={id} className={isComplete ? styles.taskCompleted : styles.task}>
      <div className={styles.checkboxBox}>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={() => {
            handleCompleteTask(id);
          }}
        />
        <img src={check} alt="" />
      </div>
      <p>{name}</p>
      <button
        onClick={() => {
          handleDeleteTask(id);
        }}
      >
        <img src={trash} alt="trash" />
      </button>
    </li>
  );
}
