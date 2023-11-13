
import "./LoginAdmin.css";
import jceLogo from "../../assets/img/imgLogin/common/jce login.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/GlobalContext";

const LoginAdmin = () => {

  const [cedula, setcedula] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { loginAdmin } = useContext(DataContext);
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("execute")
    if (cedula !== "" || Password !== "") {
      let res = await loginAdmin({
        cedula: cedula,
        contrasena: Password
      });

      window.localStorage.setItem("tokenAdmin", res.data.token);
      navigation("/admin/index")

      console.log(res);
    }
  }

  return (
    <>
      <form className="login-admin" onSubmit={handleSubmit}>
        <div className="div">
          <img className="logo-jce" alt="Logo jce " src={jceLogo} />
          <div className="login">

            <div className="field">
              <input type="text"
                className="frame"
                id="cedula"
                placeholder="000-0000000-0"
                maxlength="11"
                style={{ marginBottom: "10px" }}
                value={cedula}
                onChange={e => setcedula(e.target.value)}
              />
            </div>

            <div className="field">
              <input type="Password"
                className="frame"
                id="Password"
                placeholder="*********"
                value={Password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button className="btn" type="submit" value="Enviar" onclick="">
              <div className="text-wrapper">Acceder</div>
            </button>

            <div className="text-center">
              <Link to="/login">Ingresar como Votante</Link></div>
          </div>

          {error && <p>Todos los campos son obligatorios</p>}
        </div>
      </form>

    </>
  );
};

export default LoginAdmin;