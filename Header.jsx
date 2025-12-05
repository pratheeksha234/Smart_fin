import { Link } from 'react-router-dom';
import './Header.css';


function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark shadow-sm bgcol">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">SmartFin</Link>
        <div>
          <ul className="navbar-nav d-flex flex-row gap-3">
            <li className="nav-item"><Link className="nav-link text-white" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/dashboard">Dashboard</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/transactions">Transactions</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/connect">Upload</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/insights">Insights</Link></li>
            <li className="nav-item"><Link className="nav-link text-white" to="/goals">Goals</Link></li>
            
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
