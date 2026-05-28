import styles from "@/app/components/Medform/page.module.css";
import { useState } from "react";
import Input from "../Input/Input";
import { useAuth } from "@/context/Auth";
import Loading from "../Loading/Loading";


const MedForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");

  const { setLoading, loading } = useAuth();



  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleAction();
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.loginContainer}>
              <div className={styles.inputContainer}>
                <span className={styles.description}>Digite seu nome</span>
                <Input
                  type={"text"}
                  onChange={(e) => setName(e.target.value)}
                  variant={"default"}
                  value={name}
                  placeholder=""
                />
                {alert && (
                  <span className={styles.alert}>Credenciais invalidas</span>
                )}

                <span className={styles.description}>Digite sua senha </span>
                <Input
                  type={"password"}
                  onChange={(e) => setEmail(e.target.value)}
                  variant={"default"}
                  value={email}
                  placeholder=""
                />

                {alert && (
                  <div className={styles.alert}>Credenciais invalidas</div>
                )}
              </div>
              <Button
                onClick={handleAction}
                text="Ir"
                variant="default"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
      {loading && (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      )}
    </>
  );
};

export default MedForm;
