import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AllPosts } from './AllPosts';
import { Login } from './auth/Login';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const MyNav = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/posts">
          All Posts
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav fill className="me-auto">
            <Nav.Link as={Link} to="/newPost">
              New Post
            </Nav.Link>
            <Nav.Link as={Link} to="/myPosts">
              My Posts
            </Nav.Link>
            <Nav.Link as={Link} to="/favorites">
              Favorites
            </Nav.Link>
            <Nav.Link as={Link} to="profile">
              My Profile
            </Nav.Link>
            {localStorage.getItem('learning_user') ? (
              <li>
                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem('learning_user');
                    navigate('/login', { replace: true });
                  }}
                >
                  Logout
                </Nav.Link>
              </li>
            ) : (
              ''
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

  //   const navigate = useNavigate();
  //   return (
  //     <ul className="navbar">
  //       <li className="navbar-item">
  //
  //       </li>
  //       <li className="navbar-item">
  //         <Link to="/newPost">New Post</Link>
  //       </li>
  //       <li className="navbar-item">
  //         <Link to="/myPosts">My Posts</Link>
  //       </li>
  //       <li className="navbar-item">
  //         <Link to="favorites">Favorites</Link>
  //       </li>
  //       <li className="navbar-item">
  //         <Link to="profile">My Profile</Link>
  //       </li>
  //       {localStorage.getItem('learning_user') ? (
  //         <li>
  //           <Link
  //             to="/login"
  //             onClick={() => {
  //               localStorage.removeItem('learning_user');
  //               navigate('/login', { replace: true });
  //             }}
  //           >
  //             Logout
  //           </Link>
  //         </li>
  //       ) : (
  //         ''
  //       )}
  //     </ul>
  //   );
  // };
};
