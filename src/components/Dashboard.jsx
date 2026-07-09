import { useState, useEffect } from "react";
import { loadUserData, saveUserData } from "../utils/storage";
import { fmtBRL } from "../utils/helpers";
import TransactionForm from "./TransactionForm";

export default function Dashboard({ account, onLogout }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const d = loadUserData(account.email);
    setData(d);
    setLoading(false);
  }, [account.email]);

  function handleAddTransaction(tx) {
    const updated = {
      ...data,
      transactions: [tx, ...data.transactions],
    };
    setData(updated);
    saveUserData(account.email, updated);
  }

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

        <TransactionForm
          categories={data.categories}
          onAdd={handleAddTransaction}
        />

        <h2>Lançamentos ({data.transactions.length})</h2>
        {data.transactions.length === 0 && <p>Nenhum lançamento ainda.</p>}
        <ul>
          {data.transactions.map((t) => (
            <li key={t.id}>
              {t.date} — {t.note} — {t.type === "income" ? "+" : "-"}
              {fmtBRL(t.amount)}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
