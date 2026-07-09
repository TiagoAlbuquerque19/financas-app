import { useState, useEffect } from "react";
import { loadUserData, saveUserData } from "../utils/storage";
import { fmtBRL, monthKey } from "../utils/helpers";
import { MONTHS_PT } from "../utils/constants";
import TransactionForm from "./TransactionForm";

export default function Dashboard({ account, onLogout }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cursor, setCursor] = useState(new Date());
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

  function handleDeleteTransaction(id) {
    const updated = {
      ...data,
      transactions: data.transactions.filter((t) => t.id !== id),
    };
    setData(updated);
    saveUserData(account.email, updated);
  }

  const curKey = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}`;

  function prevMonth() {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1));
  }

  function nextMonth() {
    setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1));
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  const monthTransactions = data.transactions.filter(
    (t) => monthKey(t.date) === curKey,
  );

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

        <div style={{ marginBottom: 16 }}>
          <button onClick={prevMonth}>{"<"}</button>{" "}
          <strong>
            {MONTHS_PT[cursor.getMonth()]} {cursor.getFullYear()}
          </strong>{" "}
          <button onClick={nextMonth}>{">"}</button>
        </div>

        <TransactionForm
          categories={data.categories}
          onAdd={handleAddTransaction}
        />

        <h2>Lançamentos ({monthTransactions.length})</h2>
        {monthTransactions.length === 0 && <p>Nenhum lançamento ainda.</p>}
        <ul>
          {monthTransactions.map((t) => (
            <li key={t.id}>
              {t.date} — {t.note} — {t.type === "income" ? "+" : "-"}
              {fmtBRL(t.amount)}{" "}
              <button onClick={() => handleDeleteTransaction(t.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
