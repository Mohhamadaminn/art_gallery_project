import AppRouter from "./router";
import { CartProvider } from "./context/CartContext";
import { useDirection } from "./hooks/useDirection";

function App() {
  useDirection();

  return (
    <CartProvider>
      <AppRouter />
    </CartProvider>
  );
}

export default App;