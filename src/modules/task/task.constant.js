export const TaskConstant = {
  TASK_NOT_FOUND_MSG: "Task tidak ditemukan",
  TASK_STATUS: ["pending", "todo", "in_progress", "done"],
  TASK_STATUS_DEFAULT: "pending",
  TASK_PRIORITY: ["low", "medium", "high"],
  TASK_PRIORITY_DEFAULT: "medium",

  STATUS: {
    PENDING: {
      label: "Pending",
      value: "pending",
    },
    TODO: {
      label: "Todo",
      value: "todo",
    },
    IN_PROGRESS: {
      label: "In Progress",
      value: "in_progress",
    },
    DONE: {
      label: "Done",
      value: "done",
    },
  },

  PRIORITY: {
    LOW: {
      label: "Low",
      value: "low",
    },
    MEDIUM: {
      label: "Medium",
      value: "medium",
    },
    HIGH: {
      label: "High",
      value: "high",
    },
  },
};
