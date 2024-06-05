let inactivityTimeout;

const resetInactivityTimeout = () => {
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    fetch('/update-activity', {
      method: 'POST',
      credentials: 'same-origin'
    });
  }, 1 * 60 * 1000); // 1 minuto em milissegundos
};

window.onload = resetInactivityTimeout;
window.onmousemove = resetInactivityTimeout;
window.onmousedown = resetInactivityTimeout;  // detectar cliques
window.ontouchstart = resetInactivityTimeout; // detectar toques
window.onclick = resetInactivityTimeout;      // detectar cliques
window.onkeypress = resetInactivityTimeout;   // detectar teclas pressionadas
