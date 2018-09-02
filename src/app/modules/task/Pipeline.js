import { EventEmitter } from "events";
import logger from "~/src/app/modules/logger/pipeline";

// In NodeJS, use extend this class from EventEmitter.
class Pipeline extends EventEmitter {
  constructor(options = {}) {
    super();

    this.options = {
      within: 30000, // restrict execution time
      ...options
    };
    this._info = {
      start: "",
      end: "",
      duration: "",
      taskBoxes: {
        all: [],
        complete: [],
        failed: [],
        hanging: []
      }
    };
    this.state = {
      next: false,
      status: "COMPLETE"
    };

    /**
     * this.info object key that cannot be set
     *
     * @property
     */
    this._reservedInfo = ["start", "end", "duration", "taskBoxes"];
  }

  /**
   * Set pipeline options
   *
   * @public
   * @param {Object} options Options object for the pipeline.
   * @returns this
   */
  config = options => {
    this.options = {
      ...this.options,
      ...options
    };

    return this;
  };

  /**
   * Add taskbox (task and its option) to the pipeline.
   *
   * @public
   * @param {Function} task Task callback
   * @param {Object} options Task options object
   * @returns this
   */
  add = (task, options) => {
    if (Array.isArray(task)) {
      task.forEach(taskBox => {
        this._addTaskBox(taskBox.task, taskBox.options);
      });

      return this;
    }

    this._addTaskBox(task, options);

    return this;
  };

  /**
   * Set arbitrary information to the pipeline
   *
   * @public
   * @param {String} key Pipeline's info object key to be set.
   * @param {*} value Any data to set to pipeline's info object.
   * @param {Boolean} isMerge Whether to merge pipeline's info with the given value.
   * @returns {this}
   */
  setInfo = (key, value, isMerge = false) => {
    if (this._reservedInfo.indexOf(key) >= 0) {
      throw new Error("Error: Could not set reserved information: " + key);
    }

    if (isMerge) {
      this._info[key] = {
        ...this._info[key],
        ...value
      };
    } else {
      this._info[key] = value;
    }

    return this;
  };

  /**
   * Get pipeline's info object
   *
   * @public
   * @returns {Object} Pipeline's info object.
   */
  getInfo = () => this._info;

  /**
   * Performing all added tasks
   *
   * @public
   */
  perform = async () => {
    logger.debug("Pipeline.perform()");
    const within = this.options.within < 0 ? 0 : this.options.within;

    return new Promise((resolve, reject) => {
      this._perform(resolve);
      setTimeout(
        () => reject(new Error(`Timeout after ${within} milliseconds.`)),
        within
      );
    })
      .then(result => result)
      .catch(err => {
        logger.debug("Pipeline error: ", err.message);
        return false;
      });
  };

  /**
   * Performing all added tasks (internal API)
   *
   * @param {Function} resolve Promise's resolve callback.
   * @returns {undefined}
   */
  _perform = async resolve => {
    let taskBox;
    const context = this._generateContext();
    const taskBoxes = this._info.taskBoxes.all;

    this._info.start = Date.now();

    for (let i = 0; i < taskBoxes.length; i++) {
      //taskBox of this._info.taskBoxes.all) {
      taskBox = taskBoxes[i];
      context.options = taskBox.options;

      this.state.next = false;

      try {
        taskBox.info.start = Date.now();
        await taskBox.task(context, this._next);
        taskBox.info.end = Date.now();
        taskBox.info.duration = taskBox.info.end - taskBox.info.start;
      } catch (err) {
        console.log("error: ", err);
        logger.error(err); //`Caught error: ${err.message}`);
        taskBox.info.end = Date.now();
        taskBox.info.duration = taskBox.info.end - taskBox.info.start;

        taskBox.info.error = err.message;
      }

      if (taskBox.info.error) {
        this._appendFailedTask(taskBox);
      } else {
        this._appendCompleteTask(taskBox);
      }

      if (!this.state.next) {
        // Hanging tasks have no information at all.
        // Try adding other useful information for the tasks e.g. task name and description.
        this._appendHangingTasks(i + 1, taskBoxes.length);

        logger.info("Exiting pipeline...");
        break;
      }

      if (i === taskBoxes.length - 1) {
        logger.info("Exiting pipeline...");
      } else {
        logger.info("next...");
      }
    }

    this._info.end = Date.now();
    this._info.duration = this._info.end - this._info.start;

    resolve(this);
  };

  /**
   * next() callback being used as a callback in a task callback for allowance of the next task execution.
   *
   * @returns {undefined}
   */
  _next = () => {
    this.state.next = true;
  };

  /**
   * Add taskBox to the pipeline
   *
   * @param {Function} callback Callback to be run as a task.
   * @param {Object} options Task options object.
   * @returns {undefined}
   */
  _addTaskBox = (callback, options) => {
    this._info.taskBoxes.all.push({
      task: callback,
      options: options,
      info: {}
    });
  };

  /**
   * Generate context (ctx) object to be used in task callback.
   *
   * @param {Object} options Additional options for the context.
   * @returns {Object} Context
   */
  _generateContext = (options = {}) => {
    return {
      pipeline: this.options.data || null,
      ...options
    };
  };

  /**
   * Storing the pipeline's completed task.
   *
   * @returns {undefined}
   */
  _appendCompleteTask = taskBox => {
    this._info.taskBoxes.complete.push(taskBox);
  };

  /**
   * Storing the pipeline's failed task.
   *
   * @returns {undefined}
   */
  _appendFailedTask = taskBox => {
    this._info.taskBoxes.failed.push(taskBox);

    this.state.status = "INCOMPLETE";
  };

  /**
   * Storing the pipeline's hanging (unexcecuted) task.
   *
   * @returns {undefined}
   */
  _appendHangingTasks = (start, end) => {
    this._info.taskBoxes.hanging = [
      ...this._info.taskBoxes.all.slice(start, end)
    ];

    this.state.status = "FAILED";
  };

  toJSON = () => {
    // console.log("toJSON()");
    const obj = {
      info: this._info,
      state: this.state,
      options: this.options
    };
    // console.log("obj: ", obj);
    return obj;
  };
}

export default Pipeline;
