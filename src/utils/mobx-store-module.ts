import { action, isComputedProp, isObservableProp, set } from "mobx";

class StoreModule {
  /**
   * @desc 用于更新store中的值
   * @desc 该方法为'action',所以可以放在异步函数中执行,而不需要使用'runInAction'
   * @desc 由于接受的是对象,可以一次(同步)更新多个值(类型React.Component.setState)
   *
   * @param {object} nextState 需要更新的值
   */
  public $set(nextState: object) {
    action((state: object) => {
      for (const [key, value] of Object.entries(state)) {
        if (isObservableProp(this, key) && !isComputedProp(this, key)) {
          set(this, key, value);
        } else {
          console.error(
            new Error(
              `mobx action "$set": 当前 store 实例中不存在 "${key}", 或者 "${key}" 不是一个可观察属性(observable)`
            )
          );
        }
      }
    })(nextState);
  }
}

export { StoreModule };
