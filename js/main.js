/**
 * Composition Root — wires all dependencies together.
 * Dependency Inversion: All concrete instances are created here and injected.
 */
(() => {
  const API_BASE = 'http://localhost:4000';

  const httpClient = new HttpClient(API_BASE);
  const userApi = new UserApi(httpClient);

  const renderer = new UserRenderer(document.getElementById('users-body'));

  const formHandler = new FormHandler(
    document.getElementById('user-form'),
    document.getElementById('user-id'),
    document.getElementById('nickname'),
    document.getElementById('role'),
    document.getElementById('submit-btn'),
    document.getElementById('cancel-btn')
  );

  const messageService = new MessageService(document.getElementById('message'));

  const app = new App(
    userApi,
    renderer,
    formHandler,
    messageService,
    document.getElementById('search-input'),
    document.getElementById('search-btn'),
    document.getElementById('clear-search-btn')
  );
  app.init();
})();
