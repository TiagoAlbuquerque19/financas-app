import { useState, useEffect } from "react";
import { loadUserData } from "../utils/storage";

export default function Dashboard({ account, onLogout }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const d = loadUserData(account.email);
    setData(d);
    setLoading(false);
  }, [account.email]);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 200, background: "#15251C", padding: 16 }}>
        <h2>Livro-Caixa</h2>
        <p style={{ fontSize: 13, color: "#9FAFA4" }}>{account.name}</p>
        <button onClick={onLogout} style={{ marginTop: 20 }}>
          Sair
        </button>
      </aside>
      <main style={{ flex: 1, padding: 24 }}>
        <h1>Painel</h1>
        <p>Lançamentos: {data.transactions.length}</p>
      </main>
    </div>
  );
}
