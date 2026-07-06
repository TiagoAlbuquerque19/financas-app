import { fmtBRL, todayStr } from "./utils/helpers";
import { DEFAULT_CATEGORIES } from "./utils/constants";

function App() {
  return (
    <div>
      <h1>Livro-Caixa</h1>
      <p>Hoje: {todayStr()}</p>
      <p>Teste de valor: {fmtBRL(1500.5)}</p>
      <p>Categorias: {DEFAULT_CATEGORIES.map((c) => c.name).join(", ")}</p>
    </div>
  );
}

export default App;
