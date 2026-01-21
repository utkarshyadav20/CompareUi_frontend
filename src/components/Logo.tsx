import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export function Logo() {
  return (
    <Link to="/" className="flex items-center hover:opacity-80 transition-opacity">
      <img
        src={logo}
        alt="Compare Ui Logo"
        style={{ height: '36px', width: 'auto', paddingTop: '4px' }}
        className="object-contain"
      />
    </Link>
  );
}



