import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "./services/utils/store";


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
