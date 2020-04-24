import { createContext, useContext } from "react";
import { configure } from "mobx";

import counter from "./modules/counter";

configure({ enforceActions: "observed" });

const storesContext = createContext({
  counter
});

export const useStores = () => useContext(storesContext);
