import { Box } from '@mui/material';
import {Link} from 'react-router-dom';
import "./style.css";

const Header = () => {
  return (
    <header className="header">
      <Box>
        <Link to="/" className="logo">
          React CRUD App
        </Link>
      </Box>
    </header>
  );
};

export default Header;