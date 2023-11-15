
import "./Login.css";
import jceLogo from "../../assets/img/imgLogin/common/jce login.png";
import { useContext, useState } from "react";
import { DataContext } from "../../context/GlobalContext";
import { Link, useNavigate } from "react-router-dom";
import { DataContextAlerts } from "../../context/AlertContext";

const Login = () => {

  const [cedula, setcedula] = useState("");
  const [error, setError] = useState(false)
  const { loginElector } = useContext(DataContext);
  const { Warning, Danger, Info, Success } = useContext(DataContextAlerts);
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cedula == "") return Warning("Debe completar el campo cedula");;
    let res = await loginElector(cedula);

    if (res?.status?.toString().substring(0, 1) == 2) {
      window.localStorage.setItem("token", res.data);
      navigation("/votacion/votaciones")
    } else {
      Warning("Cedula Invalida");
    }
  }

  return (
    <>
      <form className="login-votante" onSubmit={handleSubmit}>
        <div className="div">
          <div className="overlap">
            <img className="logo-jce" alt="Logo jce 2" src={jceLogo} />
          </div>
          <div className="overlap-group">
            <div className="login">
              <div className="field">
                <input type="text" className="cedula" id="cedula" value={cedula} style={{ textAlign: "center" }}
                  onChange={(e) => setcedula(e.target.value)} placeholder="000-0000000-0" minLength={10} />
              </div>
              <button className="btn" type="submit" value="Enviar">
                Acceder
              </button>
              <div className="text-center">
                <Link to="/LoginAdmin">Ingresar como Administrador</Link></div>
              {error && <p>Todos los campos son obligatorios</p>}
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;