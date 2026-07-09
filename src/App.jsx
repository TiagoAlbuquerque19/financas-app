import { useState, useEffect } from "react";
import AuthScreen from "./components/AuthScreen";
import {
  loadAccount,
  loadSession,
  saveSession,
  clearSession,
} from "./utils/storage";

function App() {
  const [account, setAccount] = useState(null);
  const [checking, setChecking] = useState(true);

  // Roda uma vez, quando o app carrega
  useEffect(() => {
    const session = loadSession();
    if (session) {
      const acc = loadAccount(session.email);
      if (acc) setAccount(acc);
    }
    setChecking(false);
  }, []);

  function handleLogin(acc) {
    setAccount(acc);
    saveSession(acc.email);
  }

  function handleLogout() {
    setAccount(null);
    clearSession();
  }

  if (checking) {
    return null; // evita "piscar" a tela de login antes de checar
  }

  if (!account) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Bem-vindo, {account.name || account.email}!</h1>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}

export default App;
