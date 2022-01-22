import "./login.css";

export default function Login() {
  return (
    <div className="login">
          <div className="loginBox">
            <input placeholder="Email" className="loginInput" />
            <input placeholder="Password" className="loginInput" />
            <button className="signinButton">Sign In</button>
            <button className="registerButton">
              Create a New Account
            </button>
          </div>
    </div>
  );
}
