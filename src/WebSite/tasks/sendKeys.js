import Task from './Task'
import findElement from './findElement'

const task = new Task((driver, selector, value) => {
  driver.findElement.perform(driver, selector)
    .then(elem => {
     logger.info('Element found naja.');
     elem.sendKeys(value);
    })
    .catch(err => {
      logger.error('Could not fill input: ', err);
    });
});

export default task;
