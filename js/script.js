// ============================================================================
// BARBER CLUB — SCRIPT.JS
// 1. Menu hambúrguer (abre/fecha o container de links escondidos)
// 2. Validação básica do formulário de agendamento
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  /* --------------------------------------------------------------------
     1. MENU HAMBÚRGUER
     -------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById("hamburgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle("is-open");
    hamburgerBtn.setAttribute("aria-expanded", String(isOpen));
    hamburgerBtn.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu",
    );
  }

  function closeMenu() {
    mobileMenu.classList.remove("is-open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    hamburgerBtn.setAttribute("aria-label", "Abrir menu");
  }

  hamburgerBtn.addEventListener("click", toggleMenu);

  // Fecha o menu ao clicar em qualquer link dele (facilita a navegação)
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Fecha o menu automaticamente se a tela for redimensionada e
  // deixar de precisar do hambúrguer
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860) {
      closeMenu();
    }
  });

  /* --------------------------------------------------------------------
     2. VALIDAÇÃO DO FORMULÁRIO DE AGENDAMENTO
     -------------------------------------------------------------------- */
  const form = document.getElementById("bookingForm");
  const submitBtn = document.getElementById("submitBtn");
  const originalBtnText = submitBtn.textContent;

  const fields = Array.from(form.querySelectorAll("[required]"));

  function getFieldWrapper(field) {
    return field.closest(".form-field");
  }

  function validateField(field) {
    const wrapper = getFieldWrapper(field);
    const isValid = field.value.trim() !== "";

    if (wrapper) {
      wrapper.classList.toggle("has-error", !isValid);
    }

    return isValid;
  }

  // Valida em tempo real conforme o usuário preenche
  fields.forEach((field) => {
    const eventName = field.tagName === "SELECT" ? "change" : "input";
    field.addEventListener(eventName, () => validateField(field));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const allValid = fields.map((field) => validateField(field)).every(Boolean);

    if (!allValid) {
      // Foca no primeiro campo inválido para orientar o usuário
      const firstInvalid = fields.find((field) => field.value.trim() === "");
      if (firstInvalid) firstInvalid.focus();
      return;
    }

    // Tudo certo: confirma o agendamento
    submitBtn.textContent = "Horário agendado.";
    submitBtn.disabled = true;

    // Depois de um tempo, volta ao estado normal e limpa o formulário
    setTimeout(() => {
      form.reset();
      fields.forEach((field) =>
        getFieldWrapper(field)?.classList.remove("has-error"),
      );
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }, 3000);
  });
});
