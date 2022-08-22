import React from "react";
import { Box } from '@mui/material';
// Styles
import "./style.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Box>
        <span className="copyright">&copy; React CRUD App by Randhir</span>
      </Box>
    </footer>
  );
};

export default Footer;