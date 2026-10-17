import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Landing from './pages/Landing';
import BerandaDosen from './pages/BerandaDosen';
import DashboardPlaceholder from './pages/DashboardPlaceholder';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <div className="font-sans text-primary bg-background min-h-screen">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/beranda-dosen" element={<BerandaDosen />} />

          {/* Protected Routes per Role */}
          <Route element={<ProtectedRoute allowedRole="Admin(TU)" />}>
            <Route path="/admin" element={<DashboardPlaceholder />} />
          </Route>
          
          <Route element={<ProtectedRoute allowedRole="KPS" />}>
            <Route path="/kps" element={<DashboardPlaceholder />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Laboran" />}>
            <Route path="/laboran" element={<DashboardPlaceholder />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Sekjur" />}>
            <Route path="/sekjur" element={<DashboardPlaceholder />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Kajur" />}>
            <Route path="/kajur" element={<DashboardPlaceholder />} />
          </Route>

          <Route element={<ProtectedRoute allowedRole="Dosen" />}>
            <Route path="/dosen" element={<BerandaDosen />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
