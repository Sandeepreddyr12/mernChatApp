import "../login/login.css";

export default function Register() {
  return (
    <div className="login">
          <div className="loginBox">
            <input placeholder="Username" className="loginInput" />
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            {/* <input placeholder="Password Again" className="loginInput" /> */}
            <button className="signinButton">Sign Up</button>
            <button className="registerButton">
              Log into Account
            </button>
          </div>
    </div>
  );
}
