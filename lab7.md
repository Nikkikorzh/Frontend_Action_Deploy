<h2>1. Налаштування змінних оточення:</h2>
<ul>
  <li>У корені проєкту створити файл <code>.env</code></li>
  <li>Додати до нього такі змінні:</li>
  <li>Реалізувати використання цих змінних у конфігурації Axios</li>
</ul>
<img src="images/env" width="600" alt="Налаштування змінних оточення">
<h2>2. Створити конфігурацію Axios:</h2>
<ul>
  <li>Створити окремий файл (наприклад, <code>src/api/axios.ts</code>)</li>
  <li>Налаштувати базовий <code>baseURL</code>, заголовок <code>Content-Type</code>, токен авторизації</li>
  <li>Реалізувати обробку помилок через інтерцептор (наприклад, логування у консоль або показ повідомлення)</li>
</ul>
<img src="images/base" width="600" alt="Конфігурація baseURL і заголовків">
<br><img src="images/interceptor" width="600" alt="Обробка помилок через інтерцептор">
<h2>3. Замінити мок-функції на реальні HTTP-запити:</h2>
<ul>
  <li>У файлі з API-функціями (<code>src/api/posts.ts</code> або аналогічному) замінити реалізацію:</li>
  <ul>
    <li><code>getAllEntities()</code> → GET /posts</li>
    <li><code>getEntityById(id)</code> → GET /posts/:id</li>
    <li><code>createEntity(data)</code> → POST /posts</li>
    <li><code>updateEntity(id, data)</code> → PUT /posts/:id</li>
    <li><code>deleteEntity(id)</code> → DELETE /posts/:id</li>
  </ul>
  <li>Повернення типізованих відповідей із Axios бажане</li>
</ul>
<img src="images/get-del" width="600" alt="GET і DELETE запити"><br>
<img src="images/get-upd" width="600" alt="GET і UPDATE запити"><br>
<img src="images/create" width="600" alt="POST запит для створення">
<h2>4. [Опціонально, для підвищення оцінки] Реалізувати UI для логіну:</h2>
<ul>
  <li>Створити окрему сторінку логіну (<code>/login</code>)</li>
  <li>Додати форму з полями <code>email</code> та <code>password</code></li>
  <li>При сабміті відправляти POST /auth/login, отримувати JWT</li>
  <li>Зберігати токен у <code>localStorage</code> або <code>sessionStorage</code></li>
  <li>Налаштувати Axios для використання збереженого токена</li>
  <li>Після успішного логіну — редирект на <code>/posts</code></li>
  <li>У базовому варіанті допускається використання токена зі змінної оточення без UI логіну.</li>
</ul>
<img src="images/ui" width="600" alt="Інтерфейс логіну">
<br><img src="images/login" width="600" alt="Форма логіну">
<br><img src="images/redirect" width="600" alt="Редирект після логіну">
