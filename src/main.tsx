// React
import ReactDOM from "react-dom/client";
// Internationalization
import "./i18nConfig";
// My-Components
import AppRouter from "@routes/AppRouter.tsx";
import AppProvider from "@redux/provider/AppProvider.tsx";

// CSS Files
import "@styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <AppRouter />
  </AppProvider>,
);
