import { EventEmitter } from "events";
import Task from "./Task2";
import logger from "~/src/Logger/pipeline";

class Pipeline extends EventEmitter {
  /**
   *
   * @param {String} title Name of the pipeline.
   * @param {Task[]} taskBoxes Array of taskBox, an Object that have a Task instance as its property along with other properties.
   */
  constructor(title, taskBoxes) {
    super();
    this.title = title;
    this.taskBoxes = taskBoxes;
    this.result = {
      status: undefined,
      success: [],
      failed: []
    };
    this.state = {
      /**
       * start,
       * failed, -- stop in the middle of the pipeline.
       * end, -- all tasks have been performed.
       * incomplete, -- all performed, some failed.
       * complete -- all performed, no task failed.
       */
      isSuccess: false,
      isFailed: false,
      isEnd: false
    };

    this.on("_stateChange", (oldState, newState) => {});
  }

  perform = async () => {
    logger.debug("Pipeline.perform()");

    let taskBox, task;

    this._start();

    for (let i = 0; i < this.taskBoxes.length; i++) {
      logger.debug(`Performing task #${i + 1}`);

      taskBox = this.taskBoxes[i];
      task = await this._performSingle(taskBox);

      if (task.state.isFailed) {
        logger.debug(`Task #${i + 1} failed.`);

        this._appendFailedTask(taskBox);
        this._setState({ isFailed: true });

        if (this._shouldStopOnFailed(taskBox, i)) {
          break;
        }

        continue;
      }

      this._appendSuccessTask(taskBox);
    }

    this._evaluateResultStatus();
    this._triggerResultEvents();
    this._end();
  };

  /**
   * Register task to pipeline using TaskBox instance.
   *
   * @api
   * @param {TaskBox} taskBox
   * @return {Pipeline}
   */
  add = taskBox => {
    this.taskBoxes.push(taskBox);

    return this;
  };

  _performSingle = async taskBox => {
    const task = taskBox.task;

    this._trigger("beforeEach", task);
    await task.perform();
    this._trigger("afterEach", task);

    return task;
  };

  _setState = state => {
    const newState = {
      ...this.state,
      ...state
    };

    this._trigger("_stateChange", this.state, newState);

    this.state = newState;
  };

  _appendSuccessTask = taskBox => {
    this.result.success.push(taskBox);
  };

  _appendFailedTask = taskBox => {
    this.result.failed.push(taskBox);
  };

  _evaluateResultStatus = () => {
    // const results = this.result;
    let status;

    if (this.state.isFailed) {
      status = "FAILED";
    } else if (this.result.success.length === this.taskBoxes.length) {
      this._setState({ isSuccess: true });
      status = "SUCCESS";
    }

    this.result.status = status;
  };

  _triggerResultEvents = () => {
    if (this.result.status === "SUCCESS") {
      this._trigger("success");
    } else if (this.result.status === "FAILED") {
      this._trigger("failed");
    }
  };

  _trigger = (event, ...args) => {
    return this.emit(event, this, ...args);
  };

  _start = () => {
    logger.info(`Starting ${this.title} pipeline...`);
    this._trigger("start");
  };

  _end = () => {
    logger.debug("Ending pipeline...");
    this._trigger("end");
    logger.debug("Pipeline ended.");
    this._setState({ isEnd: true });
  };

  // _complete = () => {
  //   this._trigger("complete");
  // };

  // _incomplete = () => {
  //   this._trigger("incomplete");
  // };

  // _failed = () => {
  //   this._trigger("failed");
  // };

  /**
   * ===== Utils =====
   */
  _shouldStopOnFailed = (taskBox, index) => {
    return taskBox.options.stopOnFailed && index + 1 !== this.taskBoxes.length;
  };
}

export default Pipeline;
