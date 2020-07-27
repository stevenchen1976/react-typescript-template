import { observable, action } from "mobx";
import { StoreModule } from "@/utils/mobx-store-module";

class Counter extends StoreModule {
  @observable public count = 0;

  @action
  public add = () => {
    this.count++;
  };

  @action
  public sub = async () => {
    await waiting(2);
    this.$set({ count: this.count - 1 });
  };
}

async function waiting(second = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000 * second);
  });
}

export default new Counter();
