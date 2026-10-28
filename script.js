/* ===== CONFIGURAÇÕES (edite aqui) ===== */
const CONFIG = {
  whatsapp: "5514998164220",          // código do país + DDD + número
  instagram: "jonatasbaldassy",
  endereco: "",                        // ex.: "Rua Exemplo, 123, Centro, Lençóis Paulista/SP"
  formEndpoint: "",                    // opcional: URL do Formspree (veja README). Vazio = envia por WhatsApp
};

/* Lista de parceiros. Vazia por padrão. Exemplo (remova as // para usar):
   { nome: "Nome do profissional", especialidade: "Pintor", cidade: "Lençóis Paulista", telefone: "14 90000-0000" }
   Para mostrar um exemplo marcado como demonstração, acrescente: demo: true */
const PARTNERS = [
];

/* Galeria: cores de exemplo. Para usar fotos reais, coloque o arquivo em img/ e preencha "foto". */
const GALLERY = [
  { t: "Fachada clara", wall: "#E9DFD0", door: "#F26A1B", roof: "#3a3a3a" },
  { t: "Fachada grafite", wall: "#4a4a4a", door: "#F26A1B", roof: "#111" },
  { t: "Sala acolhedora", wall: "#D9A27A", door: "#fff", roof: "#222" },
  { t: "Muro em destaque", wall: "#C8472B", door: "#fff", roof: "#222" },
  { t: "Casa verde-sálvia", wall: "#9BB09D", door: "#222", roof: "#5a3b2a" },
  { t: "Azul moderno", wall: "#6B88A8", door: "#fff", roof: "#222" },
];

const $ = s => document.querySelector(s);
const onlyDigits = s => s.replace(/\D/g, "");
const waLink = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;

/* Menu */
const btn = $("#menuBtn"), menu = $("#menu");
btn.onclick = () => { const o = menu.hidden; menu.hidden = !o; btn.setAttribute("aria-expanded", o); };
menu.addEventListener("click", e => { if (e.target.tagName === "A") { menu.hidden = true; btn.setAttribute("aria-expanded", false); } });

/* Botões de WhatsApp, Instagram e mapa */
document.querySelectorAll("[data-wa]").forEach(a => { a.href = waLink(a.dataset.wa); a.target = "_blank"; a.rel = "noopener"; });
$("#igLink").href = `https://instagram.com/${CONFIG.instagram}`;
const q = encodeURIComponent(CONFIG.endereco || "Marquezim Tintas, Lençóis Paulista SP");
$("#mapLink").href = `https://www.google.com/maps/search/?api=1&query=${q}`;
$("#addr").textContent = CONFIG.endereco || "Endereço: edite em script.js (CONFIG.endereco).";
$("#yr").textContent = new Date().getFullYear();

/* Galeria */
const house = g => `<svg viewBox="0 0 200 150" role="img" aria-label="${g.t}"><rect width="200" height="150" fill="#f3efe9"/><rect y="118" width="200" height="32" fill="#cfc9bf"/><polygon points="25,60 100,20 175,60" fill="${g.roof}"/><rect x="35" y="60" width="130" height="62" fill="${g.wall}"/><rect x="88" y="78" width="26" height="44" fill="${g.door}" stroke="#0003"/><rect x="48" y="76" width="28" height="24" fill="#cfe3ef" stroke="#0003"/><rect x="126" y="76" width="28" height="24" fill="#cfe3ef" stroke="#0003"/></svg>`;
$("#gallery").innerHTML = GALLERY.map(g =>
  `<figure>${g.foto ? `<img src="img/${g.foto}" alt="${g.t}" loading="lazy">` : house(g)}<figcaption>${g.t}</figcaption></figure>`).join("");

/* Parceiros */
const box = $("#partners");
if (!PARTNERS.length) {
  box.innerHTML = `<p class="empty">Em breve, profissionais de confiança da região. Quer aparecer aqui? Use o formulário abaixo.</p>`;
} else {
  PARTNERS.forEach(p => {
    const num = onlyDigits(p.telefone);
    const el = document.createElement("article");
    el.innerHTML = `${p.demo ? '<span class="demo">Exemplo de demonstração</span>' : ""}<h3></h3><p class="e"></p><p class="c"></p>
      <div class="actions"><a class="btn btn-dark btn-sm">Ligar</a><a class="btn btn-wa btn-sm" target="_blank" rel="noopener">WhatsApp</a></div>`;
    el.querySelector("h3").textContent = p.nome;
    el.querySelector(".e").textContent = p.especialidade;
    el.querySelector(".c").textContent = p.cidade;
    const [call, wa] = el.querySelectorAll("a");
    call.href = `tel:+55${num}`;
    wa.href = `https://wa.me/55${num}?text=${encodeURIComponent("Olá! Vi seu contato no site do Jhow da Marquezim Tintas.")}`;
    box.appendChild(el);
  });
}

/* Formulário "Seja um parceiro" */
$("#partnerForm").addEventListener("submit", async e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(e.target));
  const msg = $("#formMsg");
  const texto = `Solicitação de parceria\nNome: ${d.nome}\nEspecialidade: ${d.especialidade}\nCidade: ${d.cidade}\nTelefone: ${d.telefone}`;
  if (CONFIG.formEndpoint) {
    try {
      const r = await fetch(CONFIG.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(d) });
      if (!r.ok) throw 0;
      msg.textContent = "Solicitação enviada. Entro em contato em breve.";
      e.target.reset();
    } catch { msg.textContent = "Não foi possível enviar. Tente de novo ou fale pelo WhatsApp."; }
  } else {
    window.open(waLink(texto), "_blank", "noopener");
    msg.textContent = "Abrindo o WhatsApp com seus dados. Toque em enviar por lá.";
  }
});
