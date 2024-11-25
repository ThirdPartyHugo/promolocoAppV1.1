import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { Building2, Users, UserCircle, Handshake, Briefcase, Wrench, ArrowLeft } from 'lucide-react';
import AdminDashboard from './components/Admin/Dashboard';
import TeamLeaderDashboard from './components/TeamLeader/Dashboard';
import SalesmanDashboard from './components/Salesman/Dashboard';
import ContractorDashboard from './components/Contractor/Dashboard';
import GrosLotLocoDashboard from './components/GrosLotLoco/Dashboard';
import CardHolderDashboard from './components/CardHolder/Dashboard';
import { Logo } from './components/shared/Logo';

type Role = 'admin' | 'teamLeader' | 'salesman' | 'contractor' | 'groslotloco' | 'cardholder' | null;

export const App = () => {
  const { user, isAuthenticated, initializeAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    // Initialize authentication state
    initializeAuth().then(() => setLoading(false));
  }, [initializeAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Render the login or signup form based on the `isSignup` state
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        {isSignup ? (
          <SignupForm onToggle={() => setIsSignup(false)} />
        ) : (
          <LoginForm onToggle={() => setIsSignup(true)} />
        )}
      </div>
    );
  }

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
            {[
              { id: 'admin', title: 'Admin', icon: Building2, description: 'Complete system control and analytics' },
              { id: 'teamLeader', title: 'Team Leader', icon: Users, description: 'Team management and performance tracking' },
              { id: 'salesman', title: 'Salesman', icon: UserCircle, description: 'Sales tracking and customer management' },
              { id: 'contractor', title: 'Contractor', icon: Handshake, description: 'Contract management and scheduling' },
              { id: 'groslotloco', title: 'Gros Lot Loco', icon: Briefcase, description: 'Thermopump and ISO sales management' },
              { id: 'cardholder', title: 'Card Holder', icon: Wrench, description: 'Service booking and management' },
            ].map((role) => (
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
