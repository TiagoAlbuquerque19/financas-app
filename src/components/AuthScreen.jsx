import { useState } from "react";
import { loadAccount, saveAccount } from "../utils/storage";

export default function AuthScreen({ onLogin }) {
  const [mode, setMode] = useState("login"); // "login" ou "cadastro"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    const key = email.trim().toLowerCase();

    if (mode === "cadastro") {
      if (loadAccount(key)) {
        setError("Já existe uma conta com este e-mail.");
        return;
      }
      const account = { name, email: key, password };
      saveAccount(key, account);
      onLogin(account);
    } else {
      const account = loadAccount(key);
      if (!account || account.password !== password) {
        setError("E-mail ou senha incorretos.");
        return;
      }
      onLogin(account);
    }
  }

  return (
    <div style={{ maxWidth: 360, margin: "80px auto", padding: 24 }}>
      <h1>{mode === "login" ? "Entrar" : "Criar conta"}</h1>
      {error && <p style={{ color: "#C1554B" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        {mode === "cadastro" && (
          <input
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}
        <input
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">
          {mode === "login" ? "Entrar" : "Cadastrar"}
        </button>
      </form>
      <button onClick={() => setMode(mode === "login" ? "cadastro" : "login")}>
        {mode === "login" ? "Criar conta nova" : "Já tenho conta"}
      </button>
    </div>
  );
}
