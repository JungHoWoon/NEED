import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import { UserContextProvider } from './context/userContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Navbar />
        <Outlet />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;
