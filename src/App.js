import "./App.css";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { AuthContext } from "./Helper/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  const [auth, setAuth] = useState({ username: "", id: 0, status: false });

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuth({ ...auth, status: false });
        } else {
          setAuth({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth({ username: "", id: 0, status: false });
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <BrowserRouter>
          <div className="navbar">
            <div className="links">
              {!auth.status && (
                <>
                  <Link to="/"> Login</Link>
                  <Link to="/registration"> Registration</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h1>{auth.username} </h1>
              <Link to="/">
                {auth.status && (
                  <>
                    <Link to="/home"> Home</Link>
                    <button onClick={logout}> Logout</button>
                  </>
                )}
              </Link>
            </div>
          </div>

          <Routes>
            <Route path="/home" exact element={<Home />} />
            <Route path="/createpost" exact element={<CreatePost />} />
            <Route path="/post/:id" exact element={<Post />} />
            <Route path="/" exact element={<Login />} />
            <Route path="/registration" exact element={<Registration />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
