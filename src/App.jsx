import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import LandingPage from '@/components/pages/LandingPage';
import ProductForm from '@/components/pages/ProductForm';
import ProblemSelection from '@/components/pages/ProblemSelection';
import PatternInterrupt from '@/components/pages/PatternInterrupt';
import PreviewResults from '@/components/pages/PreviewResults';
import Registration from '@/components/pages/Registration';
import Dashboard from '@/components/pages/Dashboard';
import LoginPage from '@/components/pages/LoginPage';
import EditorPage from '@/components/pages/EditorPage';
import PublishedPage from '@/components/pages/PublishedPage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="mulai" element={<ProductForm />} />
          <Route path="masalah" element={<ProblemSelection />} />
          <Route path="pattern" element={<PatternInterrupt />} />
          <Route path="preview" element={<PreviewResults />} />
          <Route path="daftar" element={<Registration />} />
          <Route path="masuk" element={<LoginPage />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="editor/:id" element={<EditorPage />} />
        </Route>
        <Route path="/p/:url" element={<PublishedPage />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ zIndex: 9999 }}
      />
    </>
  );
}

export default App;