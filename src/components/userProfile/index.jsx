import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError("");

      const randomId = Math.floor(Math.random() * 100) + 1;
      const res = await axios.get(`https://dummyjson.com/users/${randomId}`);

      setUser(res.data);
    } catch (e) {
      console.error(e);
      setUser(null);
      setError("Не удалось загрузить пользователя");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading && !user) {
    return <div className={styles.wrapper}>Loading...</div>;
  }

  if (error && !user) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.error}>{error}</p>
        <button className={styles.button} onClick={fetchUser}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        {loading && <div className={styles.loadingLine}>Loading...</div>}

        <img className={styles.avatar} src={user?.image} alt="User avatar" />

        <h2 className={styles.name}>
          {user?.firstName} {user?.lastName}
        </h2>

        <p className={`${styles.text} ${styles.emailBlock}`}>
          <span className={styles.label}>Email:</span> {user?.email}
        </p>

        <p className={`${styles.text} ${styles.phoneBlock}`}>
          <span className={styles.label}>Phone:</span> {user?.phone}
        </p>

        <button className={styles.button} onClick={fetchUser} disabled={loading}>
          {loading ? "Loading..." : "Load New User"}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

