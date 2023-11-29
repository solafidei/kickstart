import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import React from "react";
import Link from "next/link";
import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";

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
        <Toolbar>
          <Link href="/">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Box
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                }}
              >
                CrowdCoin
              </Box>
            </Typography>
          </Link>
          <Link href="/">
            <Button color="inherit" variant="outlined">
              Campaigns
            </Button>
          </Link>
          <Link href="/campaigns/new">
            <Button color="inherit" variant="outlined">
              +
            </Button>
          </Link>
          <Web3Button icon="show" label="Connect Wallet" balance="show" />
          <Web3NetworkSwitch />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
