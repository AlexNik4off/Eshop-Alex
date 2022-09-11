import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUserCircle } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  SET_ACTIVE_USER,
} from "../../redux/slice/authSlice";
import ShowOnLogin, { ShowOnLogout } from "../hiddenLink/hiddenLink";
import { AdminOnlyLink } from "../adminOnlyRoute/AdminOnlyRoute";
import {
  CALCULATE_TOTAL_QUANTITY,
  selectCartTotalQuantity,
} from "../../redux/slice/cartSlice";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  // лучше соблюдать camelCase
  const [displayName, setdisplayName] = useState("");
  const [scrollPage, setScrollPage] = useState(false);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_QUANTITY());
  }, []);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // здесь не совсем понял - ты хочеть с помощью этой функции сделать фиксированный хедер?
  const fixNavbar = () => {
    if (window.scrollY > 50) {
      setScrollPage(true);
    } else {
      setScrollPage(false);
    }
  };
  window.addEventListener("scroll", fixNavbar);

  // Monitor currently sign in user
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // console.log(user);
        if (user.displayName == null) {
          // что такое u1?
          const u1 = user.email.slice(0, -10);
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setdisplayName(uName);
        } else {
          setdisplayName(user.displayName);
        }

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userID: user.uid,
          })
        );
      } else {
        setdisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  // если у тебя однострочные стрелочные функции, можно обойтись без фигурных скобок
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("Logout successfully.");
        navigate("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // компоненты надо называть с большой буквы - может его вообще вынести в отдельный файл?
  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartTotalQuantity}</p>
      </Link>
    </span>
  );

  return (
    <>
      <header className={scrollPage ? `${styles.fixed}` : null}>
        <div className={styles.header}>
          {logo}

          <nav
            className={
              // насколько я помню, css-модули позволяют писать в camelCase стиле styles.showNav - так будет легче читать
              // но если я ошибаюсь, всегда можно переименовать классы в camelCase)
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                // сложная логика, я бы вынес в отдельную переменную
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            {/*  пустой тег, можно сделать короткую запись <div {...props} /> */}
            ></div>

            {/* здесь у тебя об*/}
            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <li>
                {/* А эта ссылка всегда будет показываться? даже если юзер не админ? */}
                <AdminOnlyLink>
                  <Link to="/admin/home">
                    <button className="--btn --btn-primary">Admin</button>
                  </Link>
                </AdminOnlyLink>
              </li>
              <li>
                <NavLink to="/" className={activeLink}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={activeLink}>
                  Contact Us
                </NavLink>
              </li>
            </ul>
            {/* у тебя на многих блоках висит один и тот же обработчик hideMenu - может повесить его на общий контейнер один раз ?*/}
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogout>
                  <NavLink to="/login" className={activeLink}>
                    Login
                  </NavLink>
                </ShowOnLogout>
                <ShowOnLogin>
                  <a href="#home" style={{ color: "#ff7722" }}>
                    <FaUserCircle size={16} />
                    Hi, {displayName}
                  </a>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/order-history" className={activeLink}>
                    My Orders
                  </NavLink>
                </ShowOnLogin>
                <ShowOnLogin>
                  <NavLink to="/" onClick={logoutUser}>
                    Logout
                  </NavLink>
                </ShowOnLogin>
              </span>
              {cart}
            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            {cart}
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
