import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, onLogout, onLogin, onSearch }) {
  const [accountOpen, setAccountOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Неверный формат email");
      return;
    }
    onLogin({ name, email });
    setEmail("");
    setName("");
    setError("");
    setAccountOpen(false);
  };

  // Обработчик изменения поискового запроса
  const handleSearchChange = (e) => {
    onSearch(e.target.value); // Передаем поисковый запрос в родительский компонент
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          🎨 ArtStyle
        </Link>
        <Link to="/gallery">Галерея</Link>
        <Link to="/community">Сообщество</Link>
      </div>

      <div className="nav-right">
        <input
          type="text"
          placeholder="Поиск..."
          onChange={handleSearchChange} // Вызываем обработчик поиска
        />
        <button
          onClick={() => setAccountOpen(!accountOpen)}
          className="account-btn"
        >
          👤 {user ? "Аккаунт" : "Войти"}
        </button>

        {accountOpen && (
          <div className="account-dropdown">
            {user ? (
              <>
                <p>
                  <strong>{user.name}</strong>
                </p>
                <p className="nickname">{user.email}</p>
                <Link to="/profile">
                  <button className="profile-btn">Личный кабинет</button>
                </Link>
                <button onClick={onLogout} className="logout-btn">
                  Выйти
                </button>
              </>
            ) : (
              <form onSubmit={handleLoginSubmit} className="login-form">
                <input
                  type="text"
                  placeholder="Имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {error && <p className="error-msg">{error}</p>}
                <button type="submit">Войти</button>
              </form>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
