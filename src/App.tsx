import { useState } from 'react';
import { Building2, Users, UserCircle, Handshake, Briefcase, Wrench, ArrowLeft } from 'lucide-react';
import AdminDashboard from './components/Admin/Dashboard';
import TeamLeaderDashboard from './components/TeamLeader/Dashboard';
import SalesmanDashboard from './components/Salesman/Dashboard';
import ContractorDashboard from './components/Contractor/Dashboard';
import GrosLotLocoDashboard from './components/GrosLotLoco/Dashboard';
import CardHolderDashboard from './components/CardHolder/Dashboard';
import { Logo } from './components/shared/Logo';
import { supabase } from './lib/supabase';

type Role = 'admin' | 'teamLeader' | 'salesman' | 'contractor' | 'groslotloco' | 'cardholder' | null;

const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleAuth = async () => {
    try {
      setError(null);
      const { data, error } = isLogin
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;

      if (data.user) {
        onLogin(data.user);
      } else if (!isLogin) {
        setError('Check your email for confirmation.');
      }
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">{isLogin ? 'Login' : 'Create Account'}</h1>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          onClick={handleAuth}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          {isLogin ? 'Login' : 'Create Account'}
        </button>
        <p className="text-center mt-4 text-gray-600">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-red-600 hover:underline"
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export const App = () => {
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [user, setUser] = useState<any>(null);

  const roles = [
    { id: 'admin', title: 'Admin', icon: Building2, description: 'Complete system control and analytics' },
    { id: 'teamLeader', title: 'Team Leader', icon: Users, description: 'Team management and performance tracking' },
    { id: 'salesman', title: 'Salesman', icon: UserCircle, description: 'Sales tracking and customer management' },
    { id: 'contractor', title: 'Contractor', icon: Handshake, description: 'Contract management and scheduling' },
    { id: 'groslotloco', title: 'Gros Lot Loco', icon: Briefcase, description: 'Thermopump and ISO sales management' },
    { id: 'cardholder', title: 'Card Holder', icon: Wrench, description: 'Service booking and management' },
  ];

  const renderDashboard = () => {
    switch (selectedRole) {
      case 'admin':
        return <AdminDashboard onBack={() => setSelectedRole(null)} />;
      case 'teamLeader':
        return <TeamLeaderDashboard onBack={() => setSelectedRole(null)} />;
      case 'salesman':
        return <SalesmanDashboard onBack={() => setSelectedRole(null)} />;
      case 'contractor':
        return <ContractorDashboard onBack={() => setSelectedRole(null)} />;
      case 'groslotloco':
        return <GrosLotLocoDashboard onBack={() => setSelectedRole(null)} />;
      case 'cardholder':
        return <CardHolderDashboard onBack={() => setSelectedRole(null)} />;
      default:
        return null;
    }
  };

  if (!user) {
    return <LoginPage onLogin={(user) => setUser(user)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedRole ? (
        <div>
          <div className="bg-white p-4 shadow-sm">
            <button
              onClick={() => setSelectedRole(null)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Portal Selection
            </button>
          </div>
          {renderDashboard()}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Logo size="lg" className="mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-red-600 mb-4">PromoLoco</h1>
            <p className="text-gray-600">Select your role to access your dashboard</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {roles.map((role) => (
              <button
                key={role.id}
                onClick={() => setSelectedRole(role.id as Role)}
                className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-red-500"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-red-50 rounded-full mb-4 group-hover:bg-red-100 transition-colors duration-300">
                    <role.icon className="w-8 h-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                  <p className="text-gray-600 text-sm">{role.description}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
