import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthProvider';

const Sidebar = () => {
  const navigate = useNavigate();
  const { logout } = useAuthContext();

  const handleLogout = () => {
    console.log(" me estoy deslogueando paapaaaaaaa")
    logout()
    navigate('/login')
  }

  return (
    <div className="left-menu">
      <ul>
        <li onClick={() => { navigate('/admin/') }}>Dashboard</li>
        <li onClick={() => { navigate('/admin/incidencias') }}>Incidencias</li>
        <li onClick={handleLogout}>Cerrar Sesión</li>
      </ul>
      <button className="cerrar-left-menu">&lt;</button>
    </div>
  );
};

export default Sidebar;
