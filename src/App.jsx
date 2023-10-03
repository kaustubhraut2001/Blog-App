import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import authservice from "./Appwrite/auth";
import { login, logout } from "./Redux/authslice";
import Footer from "./Components/Footer/Footer";
import Headers from "./Components/Header/Header";

function App() {
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    authservice
      .getcurrentuser()
      .then((userdata) => {
        if (userdata) {
          dispatch(login({ userdata }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? (
    <div>
      <Headers />
      <Footer />
    </div>
  ) : (
    <div>Loading</div>
  );
}

export default App;
