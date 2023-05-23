function getConfirmationId() {
    const url = new URL(window.location.href);
    return url.searchParams.get("confirmation");
  }
  
  const id = getConfirmationId();
  console.log(id);
  
  const orderId = document.getElementById("orderId");
  if (orderId) {
    orderId.textContent = id;
  } else {
    console.error("Erreur : L'élément orderId introuvable sur la page.");
  }