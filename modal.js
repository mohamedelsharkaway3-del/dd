// Updated modal.js with Founder-only modals and 3D interactions
const modalContainer = document.getElementById('modal-container');
function createModal(title, contentHTML, onSaveCallback) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade-in');
  modal.innerHTML = `
    <div class="modal-content glass-card slide-up">
      <h3>${title}</h3>
      ${contentHTML}
      <div class="modal-actions">
        <button class="btn" id="modal-save">Save</button>
        <button class="btn" id="modal-close">Close</button>
      </div>
    </div>`;
  modalContainer.appendChild(modal);
  modal.querySelector('#modal-close').onclick = () => modal.remove();
  modal.querySelector('#modal-save').onclick = () => { onSaveCallback(); modal.remove(); };
}const modalContainer = document.getElementById('modal-container');

function createModal(title, contentHTML, onSaveCallback) {
  const modal = document.createElement('div');
  modal.classList.add('modal', 'fade-in');
  modal.innerHTML = `
    <div class="modal-content glass-card slide-up card-3d">
      <h3>${title}</h3>
      ${contentHTML}
      <div class="modal-actions">
        <button class="btn" id="modal-save">Save</button>
        <button class="btn" id="modal-close">Close</button>
      </div>
    </div>
  `;
  modalContainer.appendChild(modal);

  // إغلاق المودال
  modal.querySelector('#modal-close').onclick = () => modal.remove();

  // حفظ البيانات
  modal.querySelector('#modal-save').onclick = () => {
    onSaveCallback();
    modal.remove();
  };

  // تحريك 3D للمودال
  const card = modal.querySelector('.card-3d');
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;
    card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
  });
}
const currentUser = JSON.parse(sessionStorage.getItem('onvo_user') || '{}');

function hasPermission(requiredRoles) {
  return requiredRoles.includes(currentUser.role);
}

document.getElementById('add-user-btn').style.display = hasPermission(['Founder','Director','Manager']) ? 'block' : 'none';
