import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {createUserAction, set_fails_user} from "@/common/store/user/user.slice";
import {useRouter} from "next/router";

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const {fails, token} = useAppSelector(state => state.rootReducer.user)
  const dispatch = useAppDispatch()
  const router = useRouter();


  useEffect(() => {
    if ((!fails.email && !fails.repeatPassword && !fails.password) && (!!email && !!password))
      dispatch(createUserAction({email, password}))
  }, [fails]);

  useEffect(() => {
    if (token)
      router.push('/');
  }, [token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const allFails = {...fails}

    if (!email) {
      allFails.email = "Field is required"

    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      allFails.email = "Invalid email"
    } else allFails.email = ""


    if (!password) {
      allFails.password = "Field is required"
    } else allFails.password = ""

    if (repeatPassword !== password) {
      dispatch(set_fails_user({...fails, repeatPassword: "Passwords do not match"}))
      allFails.repeatPassword = "Passwords do not match"
    } else allFails.repeatPassword = ""

    dispatch(set_fails_user(allFails))
  };

  return (
    <form className={"auth-form"} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {fails.email && <p>{fails.email}</p>}

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {fails.password && <p>{fails.password}</p>}

      <div>
        <label htmlFor="repeatPassword">Repeat password:</label>
        <input
          type="password"
          id="repeatPassword"
          value={repeatPassword}
          onChange={(e) => setRepeatPassword(e.target.value)}

        />
      </div>
      {fails.repeatPassword && <p>{fails.repeatPassword}</p>}

      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
