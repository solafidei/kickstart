import { AppBar, Container, Toolbar, Typography, Button } from "@mui/material";
import React from "react";

const Header: React.FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CrowdCoin
          </Typography>
          <Button
            color="inherit"
            aria-controls="nav-menu"
            aria-haspopup="true"
            onClick={(e) => setAnchorElNav(e.currentTarget)}
          >
            Campaigns
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
