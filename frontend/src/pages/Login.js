import React from "react";
import '../styles/global.css'; // Import any necessary styles
import SectionLogin from "../components/Auth/Login/SectionLogin"
const LoginPage = () => {


  return (
    <div className="login-page">
    <SectionLogin/>
    </div>
  );
};

export default LoginPage;
