import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Link, useLocation, useParams } from "react-router-dom";
import { set_searchData } from "../features/searchSlice";
import logo from "../images/logo.png";
function Header() {
  const [searchHide, setsearchHide] = useState(false);
  // const path = window.location.pathname;
  // console.log(window.location.href, "HREF");
  const location = useLocation();
  // console.log(location, "location");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(set_searchData(e.target.value));
  };

  useEffect(() => {
    let path = location?.pathname;
    if (path === "/") {
      setsearchHide(true);
    } else {
      setsearchHide(false);
    }
  }, [location?.pathname]);

  // console.log(user);
  // const navigate = useNavigate();
  //this is correct
  // onClick={()=>navigate("/")}
  //but we cant write ()=>useNavigate("/");//error
  // React Hook "useNavigate" cannot be called inside a callback. React Hooks must be called in a React function component or a custom React Hook function
  return (
    <div>
      <div className="d-flex m-2 justify-content-between mx-4 align-items-center">
        <Link to="/" style={{ color: "black", textDecoration: "none" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 className="fw-bold">MRCET FOOD_ZONE</h4>
            <img src={logo} />
          </div>
        </Link>
        {searchHide || location.pathname === "/admin" ? (
          ""
        ) : (
          <button
            type="button"
            class="btn btn-transparent position-relative"
            style={{ marginTop: "12px", border: "none" }}
          >
            <Link to="/cart" style={{ color: "black" }}>
              <ShoppingCartIcon
                style={{ marginTop: "-50%", fontSize: "45px" }}
              />
            </Link>

            {user.length !== 0 && (
              <span
                className="position-absolute start-85 translate-middle badge rounded-pill bg-warning"
                style={{ top: "-10px" }}
              >
                {user.length}
              </span>
            )}
          </button>
        )}
      </div>
      {searchHide ||
      location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/admin" ||
      location.pathname === "/add-items" ||
      location.pathname === "/all-orders" ? (
        ""
      ) : (
        <div className="header-bottom d-flex align-items-center">
          <div className="mx-3 ">
            <input
              style={{
                width: "45.5vw",
                borderRadius: "4px",
                border: "none",
                outline: "none",
                height: "4.52vh",
                paddingBottom: "4px",
              }}
              placeholder="  Search By Brand or Title"
              onChange={handleChange}
            />
          </div>
          <div
            style={{
              backgroundColor: "#ea8a1d",
              padding: "3px 5px",
              marginLeft: "-1.7%",
            }}
          >
            <SearchIcon style={{ color: "white" }} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
