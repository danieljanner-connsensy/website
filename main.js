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
      formStatus.textContent = (window.CONNSENSY_LANG === "en" ? "Please review the required fields before submitting." : "Revise os campos obrigatórios antes de enviar.");
      return;
    }

    const formData = new FormData(contactForm);

    // Honeypot: bots costumam preencher campos invisíveis.
    if (formData.get("website")) {
      contactForm.reset();
      formStatus.classList.add("success");
      formStatus.textContent = (window.CONNSENSY_LANG === "en" ? "Message sent successfully." : "Mensagem enviada com sucesso.");
      return;
    }

    if (!CONNSENSY_FORM_ENDPOINT) {
      formStatus.classList.add("error");
      formStatus.textContent =
        (window.CONNSENSY_LANG === "en" ? "The form is ready, but the Google Apps Script still needs to be connected. Meanwhile, use one of the contacts in this section." : "O formulário está preparado, mas ainda falta conectar o Google Apps Script. Enquanto isso, use um dos contatos desta seção.");
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
        (window.CONNSENSY_LANG === "en" ? "Message sent successfully. We will get back to you soon." : "Mensagem enviada com sucesso. Entraremos em contato em breve.");
    } catch (error) {
      formStatus.classList.add("error");
      formStatus.textContent =
        (window.CONNSENSY_LANG === "en" ? "We could not send your message right now. You can also contact Daniel or Gabriel directly using the details in this section." : "Não foi possível enviar agora. Você também pode falar diretamente com Daniel ou Gabriel pelos contatos desta seção.");
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


/* =========================================================
   V16 — Idiomas PT-BR / EN
   - Seleção manual no cabeçalho
   - Preferência salva no navegador
   - Na primeira visita, respeita o idioma do navegador
   ========================================================= */
const I18N = {
  pt: {
    "Jornada":"Jornada","Tecnologia":"Tecnologia","Soluções":"Soluções","Visão":"Visão","Parceiros":"Parceiros","Empresa":"Empresa","Fale conosco":"Fale conosco",
    "Velocidade do vento":"Velocidade do vento","Condição":"Condição","OPERAÇÃO SEGURA":"OPERAÇÃO SEGURA","Direção":"Direção",
    "TECNOLOGIA ULTRASSÔNICA · MVP EM FASE DE ESCALA":"TECNOLOGIA ULTRASSÔNICA · MVP EM FASE DE ESCALA",
    "Decisões melhores começam com":"Decisões melhores começam com","dados de vento confiáveis.":"dados de vento confiáveis.",
    "Soluções completas que transformam medições de vento em informação acionável para operações mais seguras, eficientes e inteligentes.":"Soluções completas que transformam medições de vento em informação acionável para operações mais seguras, eficientes e inteligentes.",
    "MVP desenvolvido":"MVP desenvolvido","Tecnologia consolidada":"Tecnologia consolidada","Domínio tecnológico":"Domínio tecnológico","Desenvolvimento próprio":"Desenvolvimento próprio","Próxima etapa":"Próxima etapa","Industrialização & escala":"Industrialização & escala",
    "Explore nossas soluções →":"Explore nossas soluções →","Fale sobre sua aplicação":"Fale sobre sua aplicação","Mais segurança":"Mais segurança","Mais eficiência":"Mais eficiência","Dados em tempo real":"Dados em tempo real",
    "NOSSA JORNADA":"NOSSA JORNADA","Da pesquisa ao MVP.":"Da pesquisa ao MVP.","Agora, rumo à escala.":"Agora, rumo à escala.",
    "A tecnologia ConnSensy evoluiu por ciclos de desenvolvimento, prototipagem e ensaios até alcançar um MVP e o domínio tecnológico necessário para fabricar o produto. A próxima etapa é transformar essa maturidade técnica em escala.":"A tecnologia ConnSensy evoluiu por ciclos de desenvolvimento, prototipagem e ensaios até alcançar um MVP e o domínio tecnológico necessário para fabricar o produto. A próxima etapa é transformar essa maturidade técnica em escala.",
    "Pesquisa":"Pesquisa","Fundamentos, arquitetura e domínio da medição ultrassônica.":"Fundamentos, arquitetura e domínio da medição ultrassônica.","Protótipos":"Protótipos","Gerações sucessivas para aprender, testar e evoluir a solução.":"Gerações sucessivas para aprender, testar e evoluir a solução.","Ensaios":"Ensaios","Experimentação e evolução em ambientes de teste cada vez mais controlados.":"Experimentação e evolução em ambientes de teste cada vez mais controlados.","Produto em estágio avançado, com tecnologia dominada para fabricação.":"Produto em estágio avançado, com tecnologia dominada para fabricação.","ESTÁGIO ATUAL":"ESTÁGIO ATUAL","Escala":"Escala","Industrialização, mercado e crescimento da capacidade de entrega.":"Industrialização, mercado e crescimento da capacidade de entrega.","PRÓXIMA ETAPA":"PRÓXIMA ETAPA",
    "PRÓXIMO CAPÍTULO":"PRÓXIMO CAPÍTULO","Estamos preparando a ConnSensy para escalar.":"Estamos preparando a ConnSensy para escalar.","Buscamos parceiros de industrialização, aplicação, integração e investimento para transformar maturidade tecnológica em produto, mercado e crescimento.":"Buscamos parceiros de industrialização, aplicação, integração e investimento para transformar maturidade tecnológica em produto, mercado e crescimento.","Converse com a ConnSensy →":"Converse com a ConnSensy →",
    "TECNOLOGIA DE PONTA":"TECNOLOGIA DE PONTA","Anemômetro Ultrassônico 2D":"Anemômetro Ultrassônico 2D","Tecnologia ultrassônica sem partes móveis para medição de velocidade e direção do vento, evoluída por sucessivas gerações de protótipos e consolidada em um MVP com domínio tecnológico para fabricação.":"Tecnologia ultrassônica sem partes móveis para medição de velocidade e direção do vento, evoluída por sucessivas gerações de protótipos e consolidada em um MVP com domínio tecnológico para fabricação.",
    "Sem partes móveis":"Sem partes móveis","Maior confiabilidade":"Maior confiabilidade","Ultrassônico 2D":"Ultrassônico 2D","Velocidade e direção":"Velocidade e direção","Comunicação digital":"Comunicação digital","Pronto para integração":"Pronto para integração","Resposta rápida":"Resposta rápida","Robusto e confiável":"Robusto e confiável","Ambientes exigentes":"Ambientes exigentes","Integrável":"Integrável","OEM e soluções verticais":"OEM e soluções verticais","Conheça o produto →":"Conheça o produto →","Precisão":"Precisão","Proteção":"Proteção","Comunicação":"Comunicação","Digital industrial*":"Digital industrial*","* valores ilustrativos nesta versão visual":"* valores ilustrativos nesta versão visual",
    "SOLUÇÕES":"SOLUÇÕES","Tecnologia que resolve problemas reais.":"Tecnologia que resolve problemas reais.","Mais do que medir vento: aplicações construídas a partir de contexto, integração e decisão.":"Mais do que medir vento: aplicações construídas a partir de contexto, integração e decisão.",
    "Crane Safety":"Segurança em Guindastes","SEGURANÇA":"SEGURANÇA","Monitore o vento em tempo real e evite operações em condições inseguras.":"Monitore o vento em tempo real e evite operações em condições inseguras.","Saiba mais →":"Saiba mais →","Smart Spraying":"Pulverização Inteligente","AGRO":"AGRO","Identifique a melhor janela de pulverização e reduza perdas por deriva.":"Identifique a melhor janela de pulverização e reduza perdas por deriva.","Port Operations":"Operações Portuárias","PORTOS":"PORTOS","Monitoramento distribuído, alertas e histórico para operações portuárias.":"Monitoramento distribuído, alertas e histórico para operações portuárias.","Wind Farm Monitoring":"Monitoramento de Parques Eólicos","ENERGIA EÓLICA":"ENERGIA EÓLICA","Dados independentes de vento para monitoramento e análise de desempenho de parques eólicos.":"Dados independentes de vento para monitoramento e análise de desempenho de parques eólicos.",
    "VISÃO DE FUTURO":"VISÃO DE FUTURO","Da medição à":"Da medição à","inteligência.":"inteligência.","O anemômetro é o ponto de partida. A tecnologia ConnSensy abre caminho para uma evolução além da medição, conectando dados, contexto e inteligência para apoiar decisões operacionais.":"O anemômetro é o ponto de partida. A tecnologia ConnSensy abre caminho para uma evolução além da medição, conectando dados, contexto e inteligência para apoiar decisões operacionais.","Possíveis evoluções":"Possíveis evoluções","Monitoramento remoto · Alarmes · Histórico · Mapas de vento · Analytics":"Monitoramento remoto · Alarmes · Histórico · Mapas de vento · Analytics","Anemômetro":"Anemômetro","Medição confiável do vento.":"Medição confiável do vento.","Integração":"Integração","Dados disponíveis para a aplicação.":"Dados disponíveis para a aplicação.","Dados & contexto":"Dados & contexto","Combinação de informação e histórico.":"Combinação de informação e histórico.","Decisão":"Decisão","Inteligência aplicada à operação.":"Inteligência aplicada à operação.",
    "CRESCER JUNTOS":"CRESCER JUNTOS","Tecnologia pronta para":"Tecnologia pronta para","encontrar escala e mercado.":"encontrar escala e mercado.","Com o MVP em estágio avançado e o domínio tecnológico consolidado, buscamos construir o ecossistema necessário para a próxima etapa: industrialização, validação em aplicações reais, integração e escala.":"Com o MVP em estágio avançado e o domínio tecnológico consolidado, buscamos construir o ecossistema necessário para a próxima etapa: industrialização, validação em aplicações reais, integração e escala.",
    "Industrialize":"Industrializar","Transformar o MVP em um produto preparado para fabricação em escala.":"Transformar o MVP em um produto preparado para fabricação em escala.","Indústria / Supply Chain":"Indústria / Cadeia de suprimentos","Validate":"Validar","Levar a tecnologia para aplicações reais e construir casos de uso relevantes.":"Levar a tecnologia para aplicações reais e construir casos de uso relevantes.","Early adopters / Pilotos":"Primeiros usuários / Pilotos","Integrate":"Integrar","Incorporar nossa tecnologia a produtos, plataformas e soluções existentes.":"Incorporar nossa tecnologia a produtos, plataformas e soluções existentes.","OEM / Integradores":"OEM / Integradores","Scale":"Escalar","Acelerar industrialização, acesso ao mercado e crescimento.":"Acelerar industrialização, acesso ao mercado e crescimento.","Investimento / Parcerias estratégicas":"Investimento / Parcerias estratégicas","DO MVP À ESCALA":"DO MVP À ESCALA","Procuramos mais do que capital.":"Procuramos mais do que capital.","Queremos conexões que agreguem capacidade industrial, acesso a mercado, conhecimento de aplicação e recursos para acelerar a próxima fase da ConnSensy.":"Queremos conexões que agreguem capacidade industrial, acesso a mercado, conhecimento de aplicação e recursos para acelerar a próxima fase da ConnSensy.","Vamos conversar →":"Vamos conversar →",
    "We turn sensing into intelligence.":"Transformamos sensoriamento em inteligência.","Transformamos conhecimento em sensoriamento e instrumentação em soluções para aplicações reais. Nosso primeiro produto nasce da medição ultrassônica de vento e de uma trajetória que já alcançou o estágio de MVP.":"Transformamos conhecimento em sensoriamento e instrumentação em soluções para aplicações reais. Nosso primeiro produto nasce da medição ultrassônica de vento e de uma trajetória que já alcançou o estágio de MVP.",
    "VAMOS CONVERSAR?":"VAMOS CONVERSAR?","Aplicações, parcerias e escala.":"Aplicações, parcerias e escala.","Queremos conversar com clientes, parceiros tecnológicos e conexões estratégicas para a próxima etapa da ConnSensy.":"Queremos conversar com clientes, parceiros tecnológicos e conexões estratégicas para a próxima etapa da ConnSensy.","Nome *":"Nome *","Empresa":"Empresa","E-mail *":"E-mail *","Aplicação / desafio *":"Aplicação / desafio *","Enviar mensagem →":"Enviar mensagem →","Enviando...":"Enviando...","Se preferir, fale diretamente com Daniel ou Gabriel pelos contatos desta seção.":"Se preferir, fale diretamente com Daniel ou Gabriel pelos contatos desta seção."
  },
  en: {
    "Jornada":"Journey","Tecnologia":"Technology","Soluções":"Solutions","Visão":"Vision","Parceiros":"Partners","Empresa":"Company","Fale conosco":"Contact us",
    "Velocidade do vento":"Wind speed","Condição":"Condition","OPERAÇÃO SEGURA":"SAFE OPERATION","Direção":"Direction",
    "TECNOLOGIA ULTRASSÔNICA · MVP EM FASE DE ESCALA":"ULTRASONIC TECHNOLOGY · MVP READY FOR THE NEXT SCALE-UP STAGE",
    "Decisões melhores começam com":"Better decisions start with","dados de vento confiáveis.":"reliable wind data.",
    "Soluções completas que transformam medições de vento em informação acionável para operações mais seguras, eficientes e inteligentes.":"Solutions that turn wind measurements into actionable information for safer, more efficient and smarter operations.",
    "MVP desenvolvido":"MVP developed","Tecnologia consolidada":"Technology consolidated","Domínio tecnológico":"Technology know-how","Desenvolvimento próprio":"In-house development","Próxima etapa":"Next stage","Industrialização & escala":"Industrialization & scale-up",
    "Explore nossas soluções →":"Explore our solutions →","Fale sobre sua aplicação":"Tell us about your application","Mais segurança":"Safer operations","Mais eficiência":"Greater efficiency","Dados em tempo real":"Real-time data",
    "NOSSA JORNADA":"OUR JOURNEY","Da pesquisa ao MVP.":"From research to MVP.","Agora, rumo à escala.":"Now, moving toward scale.",
    "A tecnologia ConnSensy evoluiu por ciclos de desenvolvimento, prototipagem e ensaios até alcançar um MVP e o domínio tecnológico necessário para fabricar o produto. A próxima etapa é transformar essa maturidade técnica em escala.":"ConnSensy technology evolved through cycles of development, prototyping and testing until reaching an MVP and the technological know-how required to manufacture the product. The next stage is to turn this technical maturity into scale.",
    "Pesquisa":"Research","Fundamentos, arquitetura e domínio da medição ultrassônica.":"Fundamentals, architecture and mastery of ultrasonic measurement.","Protótipos":"Prototypes","Gerações sucessivas para aprender, testar e evoluir a solução.":"Successive generations to learn, test and evolve the solution.","Ensaios":"Testing","Experimentação e evolução em ambientes de teste cada vez mais controlados.":"Experimentation and evolution in increasingly controlled test environments.","Produto em estágio avançado, com tecnologia dominada para fabricação.":"Advanced-stage product with the technology know-how required for manufacturing.","ESTÁGIO ATUAL":"CURRENT STAGE","Escala":"Scale","Industrialização, mercado e crescimento da capacidade de entrega.":"Industrialization, market development and increased delivery capacity.","PRÓXIMA ETAPA":"NEXT STAGE",
    "PRÓXIMO CAPÍTULO":"NEXT CHAPTER","Estamos preparando a ConnSensy para escalar.":"We are preparing ConnSensy to scale.","Buscamos parceiros de industrialização, aplicação, integração e investimento para transformar maturidade tecnológica em produto, mercado e crescimento.":"We are looking for industrialization, application, integration and investment partners to turn technological maturity into product, market and growth.","Converse com a ConnSensy →":"Talk to ConnSensy →",
    "TECNOLOGIA DE PONTA":"ADVANCED TECHNOLOGY","Anemômetro Ultrassônico 2D":"2D Ultrasonic Anemometer","Tecnologia ultrassônica sem partes móveis para medição de velocidade e direção do vento, evoluída por sucessivas gerações de protótipos e consolidada em um MVP com domínio tecnológico para fabricação.":"Ultrasonic technology with no moving parts for wind speed and direction measurement, evolved through successive prototype generations and consolidated into an MVP with manufacturing know-how.",
    "Sem partes móveis":"No moving parts","Maior confiabilidade":"Greater reliability","Ultrassônico 2D":"2D ultrasonic","Velocidade e direção":"Speed and direction","Comunicação digital":"Digital communication","Pronto para integração":"Ready for integration","Resposta rápida":"Fast response","Robusto e confiável":"Robust and reliable","Ambientes exigentes":"Demanding environments","Integrável":"Easy to integrate","OEM e soluções verticais":"OEM and vertical solutions","Conheça o produto →":"Discover the product →","Precisão":"Accuracy","Proteção":"Protection","Comunicação":"Communication","Digital industrial*":"Industrial digital*","* valores ilustrativos nesta versão visual":"* illustrative values in this visual version",
    "SOLUÇÕES":"SOLUTIONS","Tecnologia que resolve problemas reais.":"Technology that solves real-world problems.","Mais do que medir vento: aplicações construídas a partir de contexto, integração e decisão.":"More than measuring wind: applications built around context, integration and decision-making.",
    "Crane Safety":"Crane Safety","SEGURANÇA":"SAFETY","Monitore o vento em tempo real e evite operações em condições inseguras.":"Monitor wind in real time and avoid operations under unsafe conditions.","Saiba mais →":"Learn more →","Smart Spraying":"Smart Spraying","AGRO":"AGRICULTURE","Identifique a melhor janela de pulverização e reduza perdas por deriva.":"Identify the best spraying window and reduce drift-related losses.","Port Operations":"Port Operations","PORTOS":"PORTS","Monitoramento distribuído, alertas e histórico para operações portuárias.":"Distributed monitoring, alerts and historical data for port operations.","Wind Farm Monitoring":"Wind Farm Monitoring","ENERGIA EÓLICA":"WIND ENERGY","Dados independentes de vento para monitoramento e análise de desempenho de parques eólicos.":"Independent wind data for monitoring and performance analysis of wind farms.",
    "VISÃO DE FUTURO":"FUTURE VISION","Da medição à":"From measurement to","inteligência.":"intelligence.","O anemômetro é o ponto de partida. A tecnologia ConnSensy abre caminho para uma evolução além da medição, conectando dados, contexto e inteligência para apoiar decisões operacionais.":"The anemometer is the starting point. ConnSensy technology opens a path beyond measurement, connecting data, context and intelligence to support operational decisions.","Possíveis evoluções":"Possible evolutions","Monitoramento remoto · Alarmes · Histórico · Mapas de vento · Analytics":"Remote monitoring · Alerts · Historical data · Wind maps · Analytics","Anemômetro":"Anemometer","Medição confiável do vento.":"Reliable wind measurement.","Integração":"Integration","Dados disponíveis para a aplicação.":"Data available to the application.","Dados & contexto":"Data & context","Combinação de informação e histórico.":"Combining information and historical data.","Decisão":"Decision","Inteligência aplicada à operação.":"Intelligence applied to operations.",
    "CRESCER JUNTOS":"GROWING TOGETHER","Tecnologia pronta para":"Technology ready to","encontrar escala e mercado.":"reach scale and market.","Com o MVP em estágio avançado e o domínio tecnológico consolidado, buscamos construir o ecossistema necessário para a próxima etapa: industrialização, validação em aplicações reais, integração e escala.":"With an advanced-stage MVP and consolidated technological know-how, we are building the ecosystem required for the next stage: industrialization, validation in real applications, integration and scale.",
    "Industrialize":"Industrialize","Transformar o MVP em um produto preparado para fabricação em escala.":"Turn the MVP into a product prepared for scalable manufacturing.","Indústria / Supply Chain":"Industry / Supply Chain","Validate":"Validate","Levar a tecnologia para aplicações reais e construir casos de uso relevantes.":"Bring the technology into real applications and build relevant use cases.","Early adopters / Pilotos":"Early adopters / Pilots","Integrate":"Integrate","Incorporar nossa tecnologia a produtos, plataformas e soluções existentes.":"Integrate our technology into existing products, platforms and solutions.","OEM / Integradores":"OEM / Integrators","Scale":"Scale","Acelerar industrialização, acesso ao mercado e crescimento.":"Accelerate industrialization, market access and growth.","Investimento / Parcerias estratégicas":"Investment / Strategic partnerships","DO MVP À ESCALA":"FROM MVP TO SCALE","Procuramos mais do que capital.":"We are looking for more than capital.","Queremos conexões que agreguem capacidade industrial, acesso a mercado, conhecimento de aplicação e recursos para acelerar a próxima fase da ConnSensy.":"We want connections that add industrial capability, market access, application expertise and resources to accelerate ConnSensy's next phase.","Vamos conversar →":"Let's talk →",
    "We turn sensing into intelligence.":"We turn sensing into intelligence.","Transformamos conhecimento em sensoriamento e instrumentação em soluções para aplicações reais. Nosso primeiro produto nasce da medição ultrassônica de vento e de uma trajetória que já alcançou o estágio de MVP.":"We turn sensing and instrumentation expertise into solutions for real-world applications. Our first product is based on ultrasonic wind measurement and a development journey that has already reached the MVP stage.",
    "VAMOS CONVERSAR?":"LET'S TALK","Aplicações, parcerias e escala.":"Applications, partnerships and scale.","Queremos conversar com clientes, parceiros tecnológicos e conexões estratégicas para a próxima etapa da ConnSensy.":"We want to connect with customers, technology partners and strategic partners for ConnSensy's next stage.","Nome *":"Name *","Empresa":"Company","E-mail *":"Email *","Aplicação / desafio *":"Application / challenge *","Enviar mensagem →":"Send message →","Enviando...":"Sending...","Se preferir, fale diretamente com Daniel ou Gabriel pelos contatos desta seção.":"If you prefer, contact Daniel or Gabriel directly using the details in this section."
  }
};

const i18nOriginalText = new WeakMap();
const normalizeI18n = value => value.replace(/\s+/g, " ").trim();

function translateTextNodes(lang) {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      if (!parent || ["SCRIPT","STYLE","NOSCRIPT"].includes(parent.tagName)) return NodeFilter.FILTER_REJECT;
      return normalizeI18n(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  nodes.forEach(node => {
    if (!i18nOriginalText.has(node)) i18nOriginalText.set(node, normalizeI18n(node.nodeValue));
    const original = i18nOriginalText.get(node);
    const translated = I18N[lang][original];
    if (translated !== undefined) {
      const leading = node.nodeValue.match(/^\s*/)?.[0] || "";
      const trailing = node.nodeValue.match(/\s*$/)?.[0] || "";
      node.nodeValue = leading + translated + trailing;
    }
  });
}

function setLanguage(lang, save = true) {
  if (!I18N[lang]) lang = "pt";
  translateTextNodes(lang);
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.title = lang === "pt" ? "ConnSensy — Inteligência de Vento" : "ConnSensy — Wind Intelligence";
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.content = lang === "pt" ? "ConnSensy — inteligência de vento para decisões críticas." : "ConnSensy — wind intelligence for critical decisions.";
  document.querySelectorAll(".lang-btn").forEach(btn => {
    const active = btn.dataset.lang === lang;
    btn.classList.toggle("active", active);
    btn.setAttribute("aria-pressed", active ? "true" : "false");
  });
  const menuToggle = document.querySelector(".menu-toggle");
  if (menuToggle) menuToggle.setAttribute("aria-label", lang === "pt" ? "Abrir menu" : "Open menu");
  window.CONNSENSY_LANG = lang;
  if (save) localStorage.setItem("connsensy-language", lang);
}

document.querySelectorAll(".lang-btn").forEach(btn => btn.addEventListener("click", () => {
  setLanguage(btn.dataset.lang);
  if (btn.closest(".mobile-language-switcher")) {
    m.classList.remove("open");
    t.setAttribute("aria-expanded", "false");
  }
}));

const savedLanguage = localStorage.getItem("connsensy-language");
const browserLanguage = (navigator.language || "pt-BR").toLowerCase().startsWith("pt") ? "pt" : "en";
setLanguage(savedLanguage || browserLanguage, Boolean(savedLanguage));
