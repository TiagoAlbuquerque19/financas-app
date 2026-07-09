import { useState, useEffect } from "react";
import AuthScreen from "./components/AuthScreen";
import Dashboard from "./components/Dashboard";
import {
  loadAccount,
  loadSession,
  saveSession,
  clearSession,
} from "./utils/storage";

function App() {
  const [account, setAccount] = useState(null);
  const [checking, setChecking] = useState(true);

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

  if (checking) return null;

  if (!account) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  return <Dashboard account={account} onLogout={handleLogout} />;
}

export default App;
