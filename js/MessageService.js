/**
 * Single Responsibility: Only displays transient messages to the user.
 */
class MessageService {
  constructor(messageEl) {
    this._el = messageEl;
    this._timeout = null;
  }

  show(text, type = 'success') {
    clearTimeout(this._timeout);
    this._el.textContent = text;
    this._el.className = `message ${type}`;
    this._timeout = setTimeout(() => {
      this._el.className = 'message hidden';
    }, 3000);
  }

  success(text) {
    this.show(text, 'success');
  }

  error(text) {
    this.show(text, 'error');
  }
}
