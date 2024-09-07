import { useNavigate } from 'react-router-dom';

const Sidebar = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();

  const logout = () => {
    console.log("Cerrar sesión")
    setIsAuthenticated(false)
    //localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <div className="left-menu">
      <ul>
        <li onClick={() => { navigate('/admin/') }}>Dashboard</li>
        <li onClick={() => { navigate('/admin/incidencias') }}>Incidencias</li>
        <li onClick={() => { logout() }}>Cerrar Sesión</li>
      </ul>
      <button className="cerrar-left-menu">&lt;</button>
    </div>
  );
};

export default Sidebar;
