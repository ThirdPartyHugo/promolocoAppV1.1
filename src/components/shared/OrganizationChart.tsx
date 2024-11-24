import React from 'react';
import { Users, TrendingUp, ChevronDown, ChevronRight } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: 'teamLeader' | 'salesman';
  weeklySales: number;
  salesTarget: number;
  team?: TeamMember[];
}

interface OrganizationChartProps {
  data: TeamMember[];
}

const TeamMemberCard: React.FC<{ member: TeamMember; isExpanded: boolean; onToggle: () => void }> = ({
  member,
  isExpanded,
  onToggle
}) => {
  const progressPercentage = (member.weeklySales / member.salesTarget) * 100;
  const ChevronIcon = isExpanded ? ChevronDown : ChevronRight;

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 ${member.role === 'teamLeader' ? 'border-l-4 border-red-500' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center">
          {member.team && (
            <button
              onClick={onToggle}
              className="p-1 hover:bg-gray-100 rounded-full mr-2"
            >
              <ChevronIcon className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <div>
            <div className="flex items-center">
              <Users className={`w-5 h-5 ${member.role === 'teamLeader' ? 'text-red-500' : 'text-blue-500'} mr-2`} />
              <h3 className="font-medium text-gray-900">{member.name}</h3>
            </div>
            <p className="text-sm text-gray-500">{member.role === 'teamLeader' ? 'Team Leader' : 'Salesman'}</p>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center text-sm text-gray-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            <span className="font-medium">${member.weeklySales.toLocaleString()}</span>
            <span className="text-gray-400 ml-1">/ ${member.salesTarget.toLocaleString()}</span>
          </div>
          <div className="mt-2 w-32">
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  progressPercentage >= 100
                    ? 'bg-green-500'
                    : progressPercentage >= 75
                    ? 'bg-blue-500'
                    : progressPercentage >= 50
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">{progressPercentage.toFixed(0)}% of target</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeamBranch: React.FC<{ member: TeamMember }> = ({ member }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);

  return (
    <div>
      <TeamMemberCard
        member={member}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
      />
      {isExpanded && member.team && (
        <div className="ml-8 mt-4 space-y-4 relative before:absolute before:left-0 before:top-0 before:bottom-0 before:w-px before:bg-gray-200">
          {member.team.map((teamMember) => (
            <div
              key={teamMember.id}
              className="relative before:absolute before:left-0 before:top-1/2 before:w-4 before:h-px before:bg-gray-200"
            >
              {teamMember.team ? (
                <TeamBranch member={teamMember} />
              ) : (
                <TeamMemberCard
                  member={teamMember}
                  isExpanded={false}
                  onToggle={() => {}}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export const OrganizationChart: React.FC<OrganizationChartProps> = ({ data }) => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Organization Structure</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
            <span className="text-sm text-gray-600">≥100% Target</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
            <span className="text-sm text-gray-600">≥75% Target</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
            <span className="text-sm text-gray-600">≥50% Target</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
            <span className="text-sm text-gray-600">&lt;50% Target</span>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {data.map((member) => (
          <TeamBranch key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};