import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../logo.svg";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { updateAuthId } from "../../redux/dataSlice";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import SignIn from "./SignIn";

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [modalShowAuth, setModalShowAuth] = React.useState(false);
  const [modalShowAbout, setModalShowAbout] = React.useState(false);
  const authId = useSelector((state) => state.authId);
  const dispatch = useDispatch();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const logout = () => {
    auth.signOut();
    dispatch(updateAuthId(""));
    // window.location.reload();
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={logo} className="App-logo AppBar" alt="logo" />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sentym
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Button
              onClick={handleCloseNavMenu}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <span
                style={{ fontWeight: "bold" }}
                onClick={() => setModalShowAbout(true)}
              >
                About
              </span>
            </Button>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={() => setModalShowAbout(true)}>
                <Typography textAlign="center" style={{ fontWeight: "bold" }}>
                  About
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
          <img src={logo} className="App-logo AppBar1" alt="logo" />
          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Sentym
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => setModalShowAbout(true)}
            >
              About
            </Button>
          </Box>

          {authId === "" ? (
            <MenuItem onClick={() => setModalShowAuth(true)}>
              <Typography textAlign="center" style={{ fontWeight: "bold" }}>
                Sign In
              </Typography>
            </MenuItem>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Logout">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    onClick={logout}
                    style={{ cursor: "pointer" }}
                    alt="Kotino"
                    src="/images/jkuat.jpg"
                  />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </Container>

      <Modal
        show={modalShowAuth}
        onHide={() => setModalShowAuth(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <SignIn setModalShowAuth={setModalShowAuth} />
        </Modal.Body>
      </Modal>

      <Modal
        show={modalShowAbout}
        onHide={() => setModalShowAbout(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          zIndex: 1500,
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Sentym</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <i style={{ fontWeight: "bold" }}>
              Welcome to our website for JKUAT Facebook & Twitter Posts' Comments Analysis
              System!
            </i>
          </center>
          <hr />
          <Typography variant="body2" color="text.secondary">
            Welcome to our innovative website where we bring together the power
            of Facebook, language translation, and sentiment analysis. Our
            platform retrieve posts and comments from JKUAT Facebook & Twitter pages and
            harness the potential of multilingual communication. By leveraging
            Google Translate, we enable seamless translation of various
            languages, breaking down language barriers and fostering global
            connectivity.{" "}
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            At the core of our platform lies sentiment analysis, a powerful
            technique that uncovers the underlying emotions and attitudes
            expressed in text. We go beyond mere translation to provide you with
            valuable insights into the sentiment behind each translated message.
            This empowers you to understand the overall mood, opinions, and
            sentiments expressed within your Facebook & Twitter page community.
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            But we don't stop there! We take sentiment analysis a step further
            by incorporating machine learning with the renowned Naive Bayes
            algorithm. By training the output from our sentiment analysis, we
            enhance the accuracy and reliability of sentiment classification.
            Our machine learning model continuously learns and adapts, ensuring
            increasingly precise sentiment analysis results over time.
          </Typography>
          <br />
          <Typography variant="body2" color="text.secondary">
            With our integrated approach, you gain a holistic understanding of
            your Facebook page community's sentiments across languages. Whether
            you're managing a business, promoting a cause, or simply seeking to
            engage with your audience, our platform equips you with the tools to
            unlock valuable insights and make data-driven decisions.
          </Typography>

          <br />
          <Typography variant="body2" color="text.secondary">
            Experience the future of multilingual sentiment analysis today with
            our cutting-edge platform. Get started by connecting your Facebook
            page and uncover the hidden sentiments that lie within the diverse
            voices of your audience. Let's embark on a new era of global
            communication, driven by advanced technologies and enriched human
            connections.
          </Typography>
        </Modal.Body>
      </Modal>
    </AppBar>
  );
};
export default Header;
