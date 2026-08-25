const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formStatus = document.getElementById('formStatus');
const formErrorWaBtn = document.getElementById('formErrorWaBtn');

if (contactForm) {
  contactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (submitBtn) submitBtn.disabled = true;
    if (formStatus) formStatus.textContent = 'Enviando consulta...';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        if (formStatus) formStatus.textContent = '¡Consulta enviada! Redirigiendo a WhatsApp...';

        const nombre = formData.get('nombre') || '';
        const empresa = formData.get('empresa') || '';
        const telefono = formData.get('telefono') || '';
        const email = formData.get('email') || '';
        const tipoObra = formData.get('tipo_obra') || '';
        const tipoAberturas = formData.get('tipo_aberturas') || '';
        const metraje = formData.get('metraje') || '';
        const planillas = formData.get('planillas') || '';
        const mensaje = formData.get('mensaje') || '';

        const textoWhatsApp = 
`*Nueva consulta desde la web*
*Nombre:* ${nombre}
*Empresa:* ${empresa}
*Teléfono:* ${telefono}
*Email:* ${email}
*Tipo de obra:* ${tipoObra}
*Aberturas:* ${tipoAberturas}
*Metraje:* ${metraje}
*¿Planillas?:* ${planillas}
*Mensaje:* ${mensaje}`;

        const urlWhatsApp = `https://wa.me/5491164489161?text=${encodeURIComponent(textoWhatsApp)}`;

        setTimeout(() => {
          window.location.href = urlWhatsApp;
        }, 1000);

      } else {
        throw new Error('Error de envío');
      }
    } catch (error) {
      if (formStatus) formStatus.textContent = 'No pudimos enviar la consulta. Podés contactarnos directamente por WhatsApp.';
      if (formErrorWaBtn) formErrorWaBtn.classList.remove('hidden');
      if (submitBtn) submitBtn.disabled = false;
    }
  });
}
