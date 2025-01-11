import { Link, useNavigate } from "react-router-dom";
import { Box } from "../../components/Box/Box";
import { Button } from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { Layout } from "../../components/Layout/Layout";
import { Separator } from "../../components/Separator/Separator";
import classes from "./Signup.module.scss";
import { FormEvent, useState } from "react";
import { useAuthentication } from "../../context/AuthContextProvider";

export function Signup() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuthentication();

  const doSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    try {
      await signup(email, password);
      navigate("/");
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
        <h1>Sign up</h1>
        <p>Make the most of your professional life.</p>
        <form onSubmit={doSignup}>
          <Input type="email" id="email" label="Email" />
          <Input type="password" id="password" label="Password" />
          {errorMessage && <p className={classes.error}>{errorMessage}</p>}
          <p className={classes.disclaimer}>
            By clicking Agree & Join or Continue, you agree to LinkedIn's{" "}
            <a href="">User Agreement</a>, <a href="">Privacy Policy</a>, and{" "}
            <a href="">Cookie Policy</a>.
          </p>
          <Button type="submit" disabled={isLoading}>
            Agree & Join
          </Button>
        </form>
        <Separator>Or</Separator>
        <div className={classes.register}>
          Already on LinkedIn? <Link to="/login">Sign in</Link>
        </div>
      </Box>
    </Layout>
  );
}
