import React from 'react';
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import AdminPanel from './pages/adminpanel/AdminPanel';
import { CustomDialogProvider } from './hooks/CustomDialogContext';
import axios from 'axios';
import Home from './pages/home/Home';

const App: React.FC = () => {
  const [token, setToken]= React.useState<string>("");
  const [isAdmin, setIsAdmin] = React.useState<boolean>(false);

  React.useEffect(() => {
    setIsAdmin(true)
    axios.post( "http://localhost:4001/admin/auth/login",{
      email: "sc@sc.com",
      password: "seba123",
      username: "Sebac"
    })
    .then(res => {
      setToken(res.data);
    })
    .catch(err => {
      console.error(err)
      setIsAdmin(false)
    });
  },[]);

  return (
    <BrowserRouter>
      <CustomDialogProvider>
        <Routes>
          <Route path="/admin" element={<AdminPanel token={token} isAdmin={isAdmin}/>} />
          <Route path="/" element={<Home/>}/>
        </Routes>
      </CustomDialogProvider>
    </BrowserRouter>
  );
};

export default App;
