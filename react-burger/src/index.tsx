import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./services/reducers";
//import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from "react-redux";
//import thunk from "redux-thunk";

import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./services/utils/store";

/* declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
); */

/* const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
 */
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <CookiesProvider>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </CookiesProvider>
);

reportWebVitals();
