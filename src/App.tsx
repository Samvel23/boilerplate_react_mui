import { useAuthBootstrap } from "@/hooks";
import { AppRouter } from "@/routes";

function App() {
  useAuthBootstrap();

  return <AppRouter />;
}

export default App;
