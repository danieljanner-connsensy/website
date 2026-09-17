const t=document.querySelector(".menu-toggle"),m=document.querySelector(".mobile-menu");t.addEventListener("click",()=>{const o=m.classList.toggle("open");t.setAttribute("aria-expanded",o?"true":"false")});document.querySelectorAll(".mobile-menu a").forEach(a=>a.addEventListener("click",()=>{m.classList.remove("open");t.setAttribute("aria-expanded","false")}));const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.14});document.querySelectorAll(".reveal").forEach(el=>obs.observe(el));

/* =========================================================
   V11 — Formulário de contato
   Depois de publicar o Google Apps Script, cole a URL /exec abaixo.
   ========================================================= */

const CONNSENSY_FORM_ENDPOINT = "https://script.google.com/macros/s/AKfycbyCCihNb-4IhCNFgYEmMt5JJwcJ1p0OEUxGqDuTz32jtZFka_Zvfa6AwnSTJsmpO-Ou4Q/exec";

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm && formStatus) {
  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    formStatus.className = "form-status";
    formStatus.textContent = "";

    const requiredFields = [...contactForm.querySelectorAll("[required]")];
    let valid = true;

    requiredFields.forEach((field) => {
      field.classList.remove("field-error");
      if (!field.checkValidity()) {
        field.classList.add("field-error");
        valid = false;
      }
    });

    if (!valid) {
      formStatus.classList.add("error");
      formStatus.textContent = "Revise os campos obrigatórios antes de enviar.";
      return;
    }

    const formData = new FormData(contactForm);

    // Honeypot: bots costumam preencher campos invisíveis.
    if (formData.get("website")) {
      contactForm.reset();
      formStatus.classList.add("success");
      formStatus.textContent = "Mensagem enviada com sucesso.";
      return;
    }

    if (!CONNSENSY_FORM_ENDPOINT) {
      formStatus.classList.add("error");
      formStatus.textContent =
        "O formulário está preparado, mas ainda falta conectar o Google Apps Script. Enquanto isso, use um dos contatos desta seção.";
      return;
    }

    contactForm.classList.add("is-sending");

    try {
      await fetch(CONNSENSY_FORM_ENDPOINT, {
        method: "POST",
        body: formData,
        mode: "no-cors"
      });

      contactForm.reset();
      formStatus.classList.add("success");
      formStatus.textContent =
        "Mensagem enviada com sucesso. Entraremos em contato em breve.";
    } catch (error) {
      formStatus.classList.add("error");
      formStatus.textContent =
        "Não foi possível enviar agora. Você também pode falar diretamente com Daniel ou Gabriel pelos contatos desta seção.";
    } finally {
      contactForm.classList.remove("is-sending");
    }
  });

  contactForm.addEventListener("input", (event) => {
    if (event.target.matches("input, textarea")) {
      event.target.classList.remove("field-error");
    }
  });
}

