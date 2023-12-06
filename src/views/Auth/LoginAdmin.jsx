
import "./LoginAdmin.css";
import jceLogo from "../../assets/img/imgLogin/common/jce login.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataContext } from "../../context/GlobalContext";
import swal from 'sweetalert';

const LoginAdmin = () => {

  const [cedula, setcedula] = useState("");
  const [Password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const { loginAdmin } = useContext(DataContext);
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cedula !== "" || Password !== "") {
      let res = await loginAdmin({
        cedula: cedula,
        contrasena: Password
      });

      if (res?.status?.toString().substring(0, 1) == 2) {
        window.localStorage.setItem("token", res.data.token);
        navigation("/admin/index")
      } else {
        swal("Cedula Invalida!","", "warning");
      }
    }
  }

  return (
    <>
      <form className="login-admin" onSubmit={handleSubmit}>
        <div className="div">
          <img className="logo-jce" alt="Logo jce " src={jceLogo} />
          <div className="login">
            <div className="field was-validated">
              <input type="text"
                className="frame form-control validated"
                id="cedula"
                placeholder="000 0000000 0"
                maxlength="11"
                minLength={11}
                style={{ marginBottom: "10px", textAlign: "center" }}
                value={cedula}
                onChange={(e) => setcedula(e.target.value.replace(/[^0-9]/g, ''))}
              />
              <div className="invalid-feedback text-center mb-2">Cedula Incompleta</div>
            </div>
            <div className="field was-validated">
              <div className="field">
                <input type="Password"
                  className="frame form-control validated"
                  id="Password"
                  placeholder="*********"
                  value={Password}
                  onChange={e => setPassword(e.target.value)}
                  style={{ textAlign: "center" }}
                />
              </div>
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