import Link from 'next/link';
import { useEffect, useState } from 'react';
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
      <div className="logo">
        <Link href="/">Tech Store</Link>
      </div>

      <nav className="nav">
        <form onSubmit={handleSearch} className={"searchForm"}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
          />
          <button type="submit">Search</button>
        </form>

        <Link href="/">Home</Link>
        <Link href="/">Catalog</Link>
        {
          (currentUser && currentUser.isAdmin)
          && <Link href="/admin/admin-panel">Add Product</Link>
        }

        {!isLoggedIn ? (
          <>
            <Link href="/register">Register</Link>
            <Link href="/login">Login</Link>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;