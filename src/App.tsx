import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import SchemeManagement from './pages/SchemeManagement';
import UserManagement from './pages/UserManagement';
import AIModelManagement from './pages/AIModelManagement';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AddScheme } from './pages/AddScheme';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/schemes" element={<SchemeManagement />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/ai-models" element={<AIModelManagement />} />
              <Route path="/add-scheme" element={<AddScheme />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
