import { useState } from "react";
import { uid, todayStr } from "../utils/helpers";

export default function TransactionForm({ categories, onAdd }) {
  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState(categories[0]?.id || "");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(todayStr());

  function handleSubmit(e) {
    e.preventDefault();
    const value = parseFloat(String(amount).replace(",", "."));
    if (!value || value <= 0 || !note.trim()) return;

    onAdd({
      id: uid(),
      type,
      amount: value,
      category: type === "income" ? "outros" : category,
      note: note.trim(),
      date,
    });

    // limpa o formulário depois de adicionar
    setAmount("");
    setNote("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: 24,
        padding: 16,
        background: "#15251C",
        borderRadius: 4,
      }}
    >
      <div style={{ marginBottom: 10 }}>
        <label>
          <input
            type="radio"
            checked={type === "expense"}
            onChange={() => setType("expense")}
          />{" "}
          Gasto
        </label>{" "}
        <label>
          <input
            type="radio"
            checked={type === "income"}
            onChange={() => setType("income")}
          />{" "}
          Receita
        </label>
      </div>

      <input
        placeholder="Valor (ex: 50,00)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />

      <input
        placeholder="Descrição"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ display: "block", marginBottom: 8, width: "100%" }}
      />

      {type === "expense" && (
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={{ display: "block", marginBottom: 8, width: "100%" }}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      )}

      <button type="submit">Adicionar</button>
    </form>
  );
}
