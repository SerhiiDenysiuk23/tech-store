import Link from 'next/link';
import {useEffect, useState} from 'react';
import {useRouter} from "next/router";
import {deleteCookie, getCookie, TOKEN_NAME} from "@/common/api/core";
import {useAppDispatch, useAppSelector} from "@/common/hooks/useAppDispatch";
import {fetch_current_user, fetchCurrentUserAction, set_token} from "@/common/store/user/user.slice";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  const {token, currentUser} = useAppSelector(state => state.rootReducer.user)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(set_token(getCookie(TOKEN_NAME) ?? ""))
  }, []);

  const handleLogout = () => {
    deleteCookie(TOKEN_NAME)
    dispatch(set_token(""))
    setIsLoggedIn(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${searchQuery}`);
    }
  };

  useEffect(() => {
    setIsLoggedIn(!!token)
    if (token)
      dispatch(fetchCurrentUserAction())
    else if (currentUser)
      dispatch(fetch_current_user(null))
  }, [token]);

  return (
    <header className="header">
      <section className="container">
        <div className="logo">
          <Link href="/">Tech Store</Link>
        </div>

        <nav className="nav">

          <Link href="/">Home</Link>
          <Link href="/order">Basket</Link>
          {
            (currentUser && currentUser.isAdmin)
            &&
            <>
              <Link href={"/admin/order-list"}>Orders</Link>
              <Link href="/admin/admin-panel">Manage</Link>
            </>
          }
          {
            currentUser &&
            <Link href="/user-page">Cabinet</Link>
          }

          {!isLoggedIn ? (
            <>
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </>
          ) : (
            <Link href={'/'} onClick={handleLogout}>Logout</Link>
          )}
        </nav>
      </section>
    </header>
  );
};

export default Header;