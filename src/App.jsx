import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Landing from './pages/Landing';
import UserManagementPage from './pages/admin/UserManagementPage';
import CurriculumPage from './pages/kps/CurriculumPage';
import RekapKompetensiPage from './pages/kajur/RekapKompetensiPage';
import AnalisisGapPage from './pages/kajur/AnalisisGapPage';
import DashboardPlaceholder from './pages/DashboardPlaceholder';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="font-sans text-primary bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/data-kurikulum" element={<CurriculumPage />} />
          <Route path="/rekap-kompetensi-kajur" element={<RekapKompetensiPage />} />
          <Route path="/analisis-gap-kajur" element={<AnalisisGapPage />} />

          {/* Protected Routes per Role */}
          <Route element={<ProtectedRoute allowedRole="Admin" />}>
            <Route path="/admin" element={<UserManagementPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Tata Usaha" />}>
            <Route path="/tu" element={<DashboardPlaceholder />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRole="KPS" />}>
            <Route path="/kps" element={<CurriculumPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Laboran" />}>
            <Route path="/laboran" element={<DashboardPlaceholder />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Sekjur" />}>
            <Route path="/sekjur" element={<DashboardPlaceholder />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Kajur" />}>
            <Route path="/kajur" element={<RekapKompetensiPage />} />
            <Route path="/kajur/analisis-gap" element={<AnalisisGapPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Dosen" />}>
            <Route path="/dosen" element={<DashboardPlaceholder />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
