import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import logo from "../../images/logo.png";
import { useAppContext } from "../../store";

function Navbar() {
  const [button, setButton] = useState(true);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const {
    store: { jwtToken },
  } = useAppContext();

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);
  const login_user = localStorage.getItem("username");

  const authLinks = login_user + "님";
  const guestLinks = (
    <>
      <Link className="navbar_guest" to="/login">
        <Button buttonStyle="btn_outline">로그인 / 회원가입</Button>
      </Link>
    </>
  );
  useEffect(() => {
    showButton();
  }, []);

  return (
    <>
      <div className="navbar">
        <div className="navbar_container">
          <Link to="/" className="navbar_logo">
            <img src={logo} alt="" />
          </Link>
          {/* 토글아이콘  */}
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                홈
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/search"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                도서검색 / 후기작성
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/mypage"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                마이페이지
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                로그인 / 회원가입
              </Link>
            </li>
          </ul>
          <div>
            {/* {login_user === null ? (
              button && (
                <Button buttonStyle="btn_outline">로그인 / 회원가입</Button>
              )
            ) : (
              //TODO:  styling

              <button>{login_user}</button>
            )} */}
            {
              // 스토리지에 로그인유저가잇으면 authLink를
              // 아니면 guestLink를 보여줌
              <div className="nav_login">
                {login_user != null ? (
                  <p className="navbar_auth">{authLinks}</p>
                ) : (
                  guestLinks
                )}
              </div>
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
