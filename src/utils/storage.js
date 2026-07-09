// Salva/lê contas de usuário no localStorage do navegador.
// Mais pra frente trocar isso por um banco de dados real (Supabase).

export function loadAccount(email) {
  try {
    const raw = localStorage.getItem(`fin:account:${email}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveAccount(email, account) {
  try {
    localStorage.setItem(`fin:account:${email}`, JSON.stringify(account));
  } catch (e) {
    console.error("Erro ao salvar conta:", e);
  }
}

export function loadSession() {
  try {
    const raw = localStorage.getItem("fin:session");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession(email) {
  localStorage.setItem("fin:session", JSON.stringify({ email }));
}

export function clearSession() {
  localStorage.removeItem("fin:session");
}
