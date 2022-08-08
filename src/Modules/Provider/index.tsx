import MainRouter from "Components/router";
import MainLayout from "Components/Shared/Layout";
import appStore from "Modules/Redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={appStore}>
          <MainLayout>
            <MainRouter />
          </MainLayout>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};

export default App;
