import { useEffect, useState } from 'react';
import { useAuthStore } from './store/authStore';
import { AuthContainer } from './components/Auth/AuthContainer';
import { Building2, Users, UserCircle, Handshake, Briefcase, Wrench } from 'lucide-react';
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

  useEffect(() => {
    initializeAuth().then(() => setLoading(false));
  }, [initializeAuth]);

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {selectedRole ? (
        <div>
          {renderDashboard()}
        </div>
      ) : (
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <Logo size="lg" className="mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-red-600 mb-4">PromoLoco</h1>
            <p className="text-gray-600">Select your role to access your dashboard</p>
          </div>

          {!isAuthenticated && (
            <div className="mb-8">
              <AuthContainer />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              { id: 'admin', title: 'Admin', icon: Building2, description: 'Complete system control and analytics' },
              { id: 'teamLeader', title: 'Team Leader', icon: Users, description: 'Team management and performance tracking' },
              { id: 'salesman', title: 'Salesman', icon: UserCircle, description: 'Sales tracking and customer management' },
              { id: 'contractor', title: 'Contractor', icon: Handshake, description: 'Contract management and scheduling' },
              { id: 'groslotloco', title: 'Gros Lot Loco', icon: Briefcase, description: 'Thermopump and ISO sales management' },
              { id: 'cardholder', title: 'Card Holder', icon: Wrench, description: 'Service booking and management' },
            ].map((role) => {
              // Assign the icon component to a variable
              const Icon = role.icon;

              return (
                <button
                  key={role.id}
                  onClick={() => isAuthenticated && setSelectedRole(role.id as Role)}
                  disabled={!isAuthenticated}
                  className={`group bg-white p-6 rounded-xl shadow-lg transition-all duration-300 border-2 ${
                    isAuthenticated ? 'hover:shadow-xl hover:border-red-500' : 'opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="p-3 bg-red-50 rounded-full mb-4">
                      {/* Use the variable here */}
                      <Icon className="w-8 h-8 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
                    <p className="text-gray-600 text-sm">{role.description}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
