import { FormEvent, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import classes from "./Login.module.scss";
import { Box } from "../../components/Box/Box";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "../../components/Separator/Separator";
import { useAuthentication } from "../../context/AuthContextProvider";

export function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthentication();
  const navigate = useNavigate();
  const location = useLocation();

  const doLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    try {
      await login(email, password);
      const destination = location.state?.from || "/";
      navigate(destination);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout className={classes.root}>
      <Box>
        <h1>Sign in</h1>
        <p>Stayy update on your professional world.</p>
        <form onSubmit={doLogin}>
          <Input
            label="Email"
            type="email"
            id="email"
            onFocus={() => setErrorMessage("")}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            onFocus={() => setErrorMessage("")}
          />
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "..." : "Sign in"}
          </Button>
          <Link to="/request-password-reset">Forgot password?</Link>
        </form>
        <Separator>Or</Separator>
        <div className={classes.register}>
          New to LinkedIn? <Link to="/signup">Join now</Link>
        </div>
      </Box>
    </Layout>
  );
}
