import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { AxiosError } from "axios";

// 1. Import file SCSS sebagai 'styles' dari CSS Module
import styles from "./LoginPage.module.scss";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await login({ username, password });

      if (response.success) {
        const user = response.data.user;

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (user.role === "asesi") {
          navigate("/asesi/dashboard");
        } else if (user.role === "asesor") {
          navigate("/asesor/dashboard");
        }
      }
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      setError(error.response?.data?.message || "Login gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    // 2. Gunakan className dengan styles['nama-kelas']
    <div className={styles["login-page"]}>
      <div className={styles["login-page__form-container"]}>
        <h2 className={styles["login-page__title"]}>Login - LSP Sertifikasi</h2>

        {error && (
          <div className={styles["login-page__error-box"]}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className={styles["login-page__form-group"]}>
            <label
              htmlFor="username"
              className={styles["login-page__label"]}
            >
              Username atau Email
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles["login-page__input"]}
              required
            />
          </div>

          <div className={styles["login-page__form-group"]}>
            <label
              htmlFor="password"
              className={styles["login-page__label"]}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles["login-page__input"]}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${styles["login-page__button"]} ${styles["login-page__button--primary"]}`}
          >
            {loading ? "Loading..." : "Login"}
          </button>
        </form>

        {/* 3. Tambahkan bagian Link Navigasi (Register & Lupa Password) */}
        <div className={styles["login-page__links"]}>
          <a href="/password-reset-request" className={styles["link"]}>
            Lupa Password?
          </a>
          <span className={styles["separator"]}> | </span>
          <a href="/register" className={styles["link"]}>
            Daftar di sini
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;