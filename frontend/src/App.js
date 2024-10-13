import AuthProvider from './components/Auth/AuthProvider';
import AppRoutes from './routes';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
