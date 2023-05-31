import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import AuthRequired from "./components/AuthRequired";

function App() {
  return (
    <div>
      <Toaster />
      <Header />
      <div className='container mx-auto px-5'>
        <Routes>
          <Route
            path='/'
            element={
              <AuthRequired>
                <Home />
              </AuthRequired>
            }
          ></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
