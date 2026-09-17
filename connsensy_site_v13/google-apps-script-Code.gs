/**
 * ConnSensy — backend do formulário do site
 *
 * Próximo passo:
 * 1. Criar um projeto em script.google.com
 * 2. Colar este conteúdo em Code.gs
 * 3. Implantar como Web App
 * 4. Autorizar o envio de e-mails
 * 5. Copiar a URL terminada em /exec
 * 6. Colar a URL em main.js:
 *    const CONNSENSY_FORM_ENDPOINT = "SUA_URL_AQUI";
 */

const RECIPIENTS = [
  "daniel.janner@connsensy.com",
  "gabriel.onzi@connsensy.com"
];

function doPost(e) {
  try {
    const p = e.parameter || {};

    // Honeypot anti-spam
    if (p.website) {
      return jsonResponse({ ok: true });
    }

    const nome = clean(p.nome);
    const empresa = clean(p.empresa);
    const email = clean(p.email);
    const mensagem = clean(p.mensagem);

    if (!nome || !email || !mensagem) {
      return jsonResponse({ ok: false, error: "Campos obrigatórios ausentes." });
    }

    const subject = "Novo contato pelo site ConnSensy — " + nome;

    const body =
      "Novo contato recebido pelo site ConnSensy\n\n" +
      "Nome: " + nome + "\n" +
      "Empresa: " + (empresa || "-") + "\n" +
      "E-mail: " + email + "\n\n" +
      "Aplicação / desafio:\n" + mensagem + "\n";

    MailApp.sendEmail({
      to: RECIPIENTS.join(","),
      replyTo: email,
      subject: subject,
      body: body,
      name: "Site ConnSensy"
    });

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse({ ok: false, error: "Erro interno." });
  }
}

function clean(value) {
  return String(value || "").trim().slice(0, 5000);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
