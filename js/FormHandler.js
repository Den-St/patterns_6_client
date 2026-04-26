/**
 * Single Responsibility: Only manages form state (populate, read, reset).
 */
class FormHandler {
  constructor(formEl, idInput, nicknameInput, roleInput, submitBtn, cancelBtn) {
    this._form = formEl;
    this._idInput = idInput;
    this._nickname = nicknameInput;
    this._role = roleInput;
    this._submitBtn = submitBtn;
    this._cancelBtn = cancelBtn;
  }

  getData() {
    return {
      nickname: this._nickname.value.trim(),
      role: this._role.value.trim(),
    };
  }

  getEditingId() {
    return this._idInput.value ? Number(this._idInput.value) : null;
  }

  populateForEdit(user) {
    this._idInput.value = user.id;
    this._nickname.value = user.nickname;
    this._role.value = user.role;
    this._submitBtn.textContent = 'Update User';
    this._cancelBtn.classList.remove('hidden');
  }

  reset() {
    this._form.reset();
    this._idInput.value = '';
    this._submitBtn.textContent = 'Create User';
    this._cancelBtn.classList.add('hidden');
  }

  onSubmit(handler) {
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      handler();
    });
  }

  onCancel(handler) {
    this._cancelBtn.addEventListener('click', handler);
  }
}
