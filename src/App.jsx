import { HashRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import LoginPage from './pages/LoginPage';
import { RecoilRoot } from 'recoil';
import FormPage from './pages/FormPage';

function App() {
  return (
    <div>
    <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "green",
              },
            },
          }}
        ></Toaster>
      </div>
      <RecoilRoot>
        <HashRouter>
          <Routes>
            <Route path='/' element={<LoginPage/>} />
            <Route path='/form/:rol' element={<FormPage/>} />
          </Routes>
        </HashRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;