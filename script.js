// ===== EDITE AQUI =====
const CONFIG = 
  whatsapp: "5514998164220",
  endereco: "", // ex.: "Rua X, 123, Centro, Lençóis Paulista/SP"
  links: {
    suvinil: "https://www.suvinil.com.br",
    futura: "",   //https://futuratintas.com.br/catalogo-de-cores/ cole o link do catálogo de cores da Futura
    anjo: "",     //https://www5.anjo.com.br/files/cartela_cores/cartelacores_12.pdf o link do PDF da Anjo Tintas
    skylack: "",  //https://site.skylack.com.br/tintas-prontas/
    advance: "https://advancetintas.com.br",
    ecomundi:
  }
};
// ======================

const zapUrl = t => "https://wa.me/" + CONFIG.whatsapp + "?text=" + encodeURIComponent(t);

document.querySelectorAll("[data-zap]").forEach(a => {
  a.href = zapUrl(a.dataset.zap);
  a.target = "_blank";
  a.rel = "noopener";
});

document.querySelectorAll("[data-link]").forEach(a => {
  const url = CONFIG.links[a.dataset.link];
  if (url) a.href = url;
  else { a.classList.add("sem-link"); a.removeAttribute("target"); }
});

if (CONFIG.endereco) document.getElementById("endereco").textContent = CONFIG.endereco;

// Calculadora (aceita link pré-preenchido: ?amb=Sala&alt=2.7&desc=0&dem=2)
const $ = id => document.getElementById(id);
const q = new URLSearchParams(location.search);
["amb", "comp", "larg", "alt", "desc", "dem", "rend"].forEach(id => {
  if (q.has(id)) $(id).value = q.get(id).replace(",", ".");
});

function calcular() {
  const n = id => parseFloat(String($(id).value).replace(",", ".")) || 0;
  const area = 2 * (n("comp") + n("larg")) * n("alt") - n("desc");
  const rend = n("rend");
  const dem = Math.max(1, n("dem"));
  if (area <= 0 || rend <= 0) {
    $("resultado").textContent = "Confira as medidas: a área de parede deve ser maior que zero.";
    $("zapCalc").hidden = true;
    return;
  }
  const litros = (area * dem) / rend;
  const txt = `${$("amb").value || "Ambiente"}: ${area.toFixed(1)} m² de parede, ${dem} demão(s), cerca de ${litros.toFixed(1)} litros.`;
  $("resultado").textContent = txt;
  const z = $("zapCalc");
  z.href = zapUrl("Olá Jhow! Fiz o cálculo no seu site. " + txt);
  z.target = "_blank";
  z.rel = "noopener";
  z.hidden = false;
}
$("calcular").addEventListener("click", calcular);
if (q.has("amb") || q.has("alt")) calcular();

// Seja um parceiro
$("enviarParceiro").addEventListener("click", () => {
  const nome = $("pNome").value.trim();
  if (!nome) { $("pNome").focus(); return; }
  const t = `Olá Jhow! Quero ser parceiro. Nome: ${nome}. Profissão: ${$("pProf").value.trim()}. Cidade: ${$("pCid").value.trim()}.`;
  window.open(zapUrl(t), "_blank", "noopener");
});
