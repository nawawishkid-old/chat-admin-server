import Task from "./Task";

class TaskBox {
  /**
   *
   * @param {Task} task A Task instance.
   * @param {Object} options Object of options for Pipeline
   */
  constructor(task, options = {}) {
    this.task = task;
    this.options = {
      stopOnFailed: true,
      ...options
    };
  }
}

export default TaskBox;
