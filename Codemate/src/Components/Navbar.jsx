import React from "react";
import logo from "../logo.png";
import "../CSS/navbar.css";
import SearchIcon from '@mui/icons-material/Search';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import GitHubIcon from '@mui/icons-material/GitHub';
const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="logo">
          <img src={logo} alt="" className="logo" />
        </div>
        <div className="searchdiv">
          <input type="text" placeholder=" Search" className="search" />
        <div className="searchicon">  <SearchIcon/>   </div>
        </div>
        <div className="navlink">
          Docs📄<span className="down">▼</span>
        </div>
        <div className="navlink">Practice 📝</div>
        <div className="navlink">
          Courses 📚<span className="down">▼</span>
        </div>
        <div className="navlink">Community 🌐</div>
        <div className="navlink">About ℹ️</div>
        <div className="navlink">Login 🔑</div>
        <div className="darkmode"><DarkModeIcon/></div>
        <div className="github"><GitHubIcon/></div>
      </nav>
    </div>
  );
};

export default Navbar;
