import styles from "@/styles/Column.module.scss";
import Task from "./Task.component";

interface Props {
  header: string;
}

// TODO replace with database logic
const tasks = [
  {
    title: "Plan Product Hunt launch",
    description: "",
    status: "Todo",
    subtasks: [
      {
        title: "Find hunter",
        isCompleted: false,
      },
      {
        title: "Gather assets",
        isCompleted: false,
      },
      {
        title: "Draft product page",
        isCompleted: false,
      },
      {
        title: "Notify customers",
        isCompleted: false,
      },
      {
        title: "Notify network",
        isCompleted: false,
      },
      {
        title: "Launch!",
        isCompleted: false,
      },
    ],
  },
  {
    title: "Share on Show HN",
    description: "",
    status: "",
    subtasks: [
      {
        title: "Draft out HN post",
        isCompleted: false,
      },
      {
        title: "Get feedback and refine",
        isCompleted: false,
      },
      {
        title: "Publish post",
        isCompleted: false,
      },
    ],
  },
  {
    title: "Write launch article to publish on multiple channels",
    description: "",
    status: "",
    subtasks: [
      {
        title: "Write article",
        isCompleted: false,
      },
      {
        title: "Publish on LinkedIn",
        isCompleted: false,
      },
      {
        title: "Publish on Inndie Hackers",
        isCompleted: false,
      },
      {
        title: "Publish on Medium",
        isCompleted: false,
      },
    ],
  },
];

const Column: React.FC<Props> = ({ header }) => {
  const columnHeader = `${header.toUpperCase()} (${tasks.length})`;

  return (
    <div className={styles.column__container}>
      <h3 className={styles.column__header}>{columnHeader}</h3>
      <div className={styles.column__tasks}>
        {tasks.map((task) => {
          return (
            <Task
              key={task.description}
              title="task header"
              subtasks="1 of 2 complete"
            />
          );
        })}
      </div>
    </div>
  );
};

export default Column;
