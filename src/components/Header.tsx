import styles from "./Header.module.css";
import rocketLogo from "../assets/rocket.svg";

export function Header() {
  return (
    <header className={styles.appHeader}>
      <div className={styles.logo}>
        <img id="rocket" src={rocketLogo} alt="rocket" />
        <div className={styles.todo}>
          <span>to</span>
          <span>do</span>
        </div>
      </div>
    </header>
  );
}
