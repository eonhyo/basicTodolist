import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TodoProvider from "./context/TodoContext";
import Router from "./route/Router";


const queryClient = new QueryClient()
const App = () => {
  return (
    <QueryClientProvider client = {queryClient}>
    <TodoProvider>
      <Router />
    </TodoProvider>
    </QueryClientProvider>
  );
};

export default App;
