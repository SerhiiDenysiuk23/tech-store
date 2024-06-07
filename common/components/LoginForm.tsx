import {useEffect, useState} from 'react';
import {fetchTokenAction} from "@/common/store/user/user.slice";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {getCookie, TOKEN_NAME} from "@/common/api/core";
import {useRouter} from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch()
  const {token, fails} = useAppSelector(state => state.rootReducer.user)
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    dispatch(fetchTokenAction({email, password}))
  };

  useEffect(() => {
    if (token || getCookie(TOKEN_NAME))
      router.push('/')
  }, [token]);

  return (
    <form className={"auth-form"} onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {fails.invalidLogin && <p>{fails.invalidLogin}</p>}
    </form>
  );
};

export default LoginForm;
