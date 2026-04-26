/**
 * Single Responsibility: Orchestrates the application by coordinating other classes.
 * Dependency Inversion: Depends on injected abstractions (UserApi, UserRenderer, etc.).
 * Open/Closed: New features can be added by composing new classes, not modifying this one.
 */
class App {
  constructor(userApi, renderer, formHandler, messageService, searchInput, searchBtn, clearBtn) {
    this._api = userApi;
    this._renderer = renderer;
    this._form = formHandler;
    this._messages = messageService;
    this._searchInput = searchInput;
    this._searchBtn = searchBtn;
    this._clearBtn = clearBtn;
  }

  init() {
    this._renderer.setCallbacks(
      (user) => this._startEdit(user),
      (id) => this._deleteUser(id)
    );

    this._form.onSubmit(() => this._handleSubmit());
    this._form.onCancel(() => this._form.reset());

    this._searchBtn.addEventListener('click', () => this._handleSearch());
    this._searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this._handleSearch();
    });
    this._clearBtn.addEventListener('click', () => this._clearSearch());

    this._loadUsers();
  }

  async _loadUsers() {
    try {
      const users = await this._api.getAll();
      this._renderer.render(users);
    } catch (err) {
      this._messages.error('Failed to load users: ' + err.message);
    }
  }

  async _handleSubmit() {
    const data = this._form.getData();
    const editingId = this._form.getEditingId();

    try {
      if (editingId) {
        await this._api.update(editingId, data);
        this._messages.success('User updated successfully');
      } else {
        await this._api.create(data);
        this._messages.success('User created successfully');
      }
      this._form.reset();
      await this._loadUsers();
    } catch (err) {
      this._messages.error(err.message);
    }
  }

  _startEdit(user) {
    this._form.populateForEdit(user);
  }

  async _deleteUser(id) {
    if (!confirm('Delete this user?')) return;
    try {
      await this._api.delete(id);
      this._messages.success('User deleted');
      await this._loadUsers();
    } catch (err) {
      this._messages.error(err.message);
    }
  }

  async _handleSearch() {
    const query = this._searchInput.value.trim();
    if (!query) return;
    try {
      const users = await this._api.searchByNickname(query);
      this._renderer.render(users);
      this._clearBtn.classList.remove('hidden');
    } catch (err) {
      this._messages.error(err.message);
    }
  }

  _clearSearch() {
    this._searchInput.value = '';
    this._clearBtn.classList.add('hidden');
    this._loadUsers();
  }
}
