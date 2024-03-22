import styles from "../../app/page.module.css";

export const Input = (props) => {
  return (
    <input
      type={props.type}
      className={props.css}
      placeholder={props.placeholder}
      onChange={(e) => props.onChange(e.target.value)}
      value={props.value}
    />
  );
};

export const Button = (props) => {
  return (
    <button
      type={props.type}
      className={styles.saveButton}
      onClick={props.onClick()}
    >
      {props.label}
    </button>
  );
};

export const SideBarSelections = (props) => (
  <div
    className={styles.sideBarIconTextContainer}
    type="button"
    onClick={props.onClick()}
  >
    <props.name color={props.color} size={props.size} />
    <p className={styles.sideBarText}>{props.label}</p>
  </div>
);
