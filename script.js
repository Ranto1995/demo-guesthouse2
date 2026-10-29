// 1. DONNÉES : un objet par langue. La clé (ex: "cta") correspond
//    à l'attribut data-i18n dans le HTML.
const textes = {
  fr: {
    hero_title: "Votre maison au calme, à deux pas de la ville",
    hero_text: "Chambres propres, petit-déjeuner malgache, accueil chaleureux.",
    cta: "Réserver sur WhatsApp",
    rooms_title: "Nos chambres",
    room1_name: "Chambre simple", room1_desc: "1 lit, salle de bain privée, Wi-Fi.",
    room2_name: "Chambre double", room2_desc: "2 lits ou 1 grand lit, balcon, Wi-Fi.",
    room3_name: "Chambre famille", room3_desc: "Jusqu'à 4 personnes, petit salon.",
    price_note: "Prix par nuit, petit-déjeuner inclus.",
    contact_title: "Nous contacter",
    contact_text: "Écrivez-nous avec vos dates, nous répondons le jour même.",
    demo: "Site de démonstration",
    wa_msg: "Bonjour, je souhaite réserver une chambre."
  },
  mg: {
    hero_title: "Ny tranonao milamina, akaikin'ny tanàna",
    hero_text: "Efitra madio, sakafo maraina malagasy, fandraisana mahafinaritra.",
    cta: "Mandefa hafatra amin'ny WhatsApp",
    rooms_title: "Ny efitranay",
    room1_name: "Efitra tokana", room1_desc: "Fandriana 1, efitra fidiovana manokana, Wi-Fi.",
    room2_name: "Efitra roa", room2_desc: "Fandriana 2 na lehibe 1, lavarangana, Wi-Fi.",
    room3_name: "Efitra fianakaviana", room3_desc: "Hatramin'ny olona 4, efitra fandraisam-bahiny kely.",
    price_note: "Vidiny isan'alina, ao anatin'izany ny sakafo maraina.",
    contact_title: "Mifandraisa aminay",
    contact_text: "Soraty ny daty tadiavinao, havaly anao anio ihany izahay.",
    demo: "Tranokala fanehoana",
    wa_msg: "Manao veloma, te hanakalo efitra aho."
  },
  en: {
    hero_title: "Your quiet home, a short ride from the city",
    hero_text: "Clean rooms, Malagasy breakfast, warm welcome.",
    cta: "Book on WhatsApp",
    rooms_title: "Our rooms",
    room1_name: "Single room", room1_desc: "1 bed, private bathroom, Wi-Fi.",
    room2_name: "Double room", room2_desc: "2 beds or 1 large bed, balcony, Wi-Fi.",
    room3_name: "Family room", room3_desc: "Up to 4 guests, small lounge.",
    price_note: "Price per night, breakfast included.",
    contact_title: "Contact us",
    contact_text: "Message us your dates, we reply the same day.",
    demo: "Demo website",
    wa_msg: "Hello, I would like to book a room."
  }
};

const NUMERO_WHATSAPP = "261340000000"; // format international, sans + ni espaces

// 2. FONCTION principale : applique une langue à toute la page
function setLang(lang) {
  const t = textes[lang];

  // querySelectorAll = trouve TOUS les éléments qui ont data-i18n
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t[el.dataset.i18n]; // dataset.i18n = valeur de data-i18n
  });

  // Lien WhatsApp avec message pré-rempli (encodeURIComponent gère les accents/espaces)
  const lien = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(t.wa_msg)}`;
  document.getElementById("wa-main").href = lien;
  document.getElementById("wa-second").href = lien;

  // Met à jour la langue de la page et le bouton surligné
  document.documentElement.lang = lang;
  document.querySelectorAll(".langs button").forEach(b => {
    b.classList.toggle("active", b.dataset.lang === lang);
  });

  // 3. Mémorise le choix (try/catch : le stockage peut être bloqué)
  try { localStorage.setItem("lang", lang); } catch (e) {}
}

// 4. ÉVÉNEMENTS : un clic sur un bouton de langue appelle setLang
document.querySelectorAll(".langs button").forEach(b => {
  b.addEventListener("click", () => setLang(b.dataset.lang));
});

// 5. AU CHARGEMENT : langue mémorisée, sinon français
let langue = "fr";
try { langue = localStorage.getItem("lang") || "fr"; } catch (e) {}
setLang(textes[langue] ? langue : "fr");
