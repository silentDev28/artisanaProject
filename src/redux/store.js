import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./rootReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const appleLogger = [logger];
const persistConfig = {
  key: "adminAuth",
  storage: storage,
  whitelist: ["adminAuth", "currentRoute"], // which reducer want to store
};
const pReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(pReducer, applyMiddleware(...appleLogger));
const persistor = persistStore(store);
export default store;
