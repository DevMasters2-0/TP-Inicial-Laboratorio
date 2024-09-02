import { useNavigate } from 'react-router-dom';

const Sidebar = ({ handleChange }) => {
  const navigate = useNavigate();

  return (
    <div className="left-menu">
      <ul>
        <li onClick={() => { navigate('/admin/') }}>Dashboard</li>
        <li onClick={() => { navigate('/admin/incidencias') }}>Incidencias</li>
        <li>Cerrar Sesión</li>
      </ul>
      <button className="cerrar-left-menu">&lt;</button>
    </div>
  );
};

export default Sidebar;
