// Gera um ID único simples (suficiente para uso local)
export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

// Formata número como Real brasileiro: 1500.5 -> "R$ 1.500,50"
export function fmtBRL(value) {
  return (value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Extrai "2026-07" de uma data "2026-07-15"
export function monthKey(dateStr) {
  return dateStr.slice(0, 7);
}

// Retorna a data de hoje no formato "YYYY-MM-DD"
export function todayStr() {
  return new Date().toISOString().slice(0, 10);
}
