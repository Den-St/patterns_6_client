/**
 * Single Responsibility: Only handles rendering users into the DOM table.
 * Interface Segregation: Only requires onEdit/onDelete callbacks, not the whole app.
 */
class UserRenderer {
  constructor(tbodyElement) {
    this._tbody = tbodyElement;
    this._onEdit = null;
    this._onDelete = null;
  }

  setCallbacks(onEdit, onDelete) {
    this._onEdit = onEdit;
    this._onDelete = onDelete;
  }

  render(users) {
    this._tbody.innerHTML = '';
    users.forEach((user) => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${user.id}</td>
        <td>${this._escapeHtml(user.nickname)}</td>
        <td>${this._escapeHtml(user.role)}</td>
        <td></td>
      `;

      const actionsCell = tr.querySelector('td:last-child');

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.className = 'btn-edit';
      editBtn.addEventListener('click', () => this._onEdit(user));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Delete';
      deleteBtn.className = 'btn-delete';
      deleteBtn.addEventListener('click', () => this._onDelete(user.id));

      actionsCell.append(editBtn, deleteBtn);
      this._tbody.appendChild(tr);
    });
  }

  _escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
