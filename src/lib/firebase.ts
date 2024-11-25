import { createClient } from '@supabase/supabase-js';
import type { UserRole } from '../types/firebase';

// Initialize Supabase
const supabaseUrl = 'https://jowosxdlplhgyuwwxjag.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impvd29zeGRscGxoZ3l1d3d4amFnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMjQ4OTQzOCwiZXhwIjoyMDQ4MDY1NDM4fQ.Uhou0nLNzk7vZ4WleAR5bMa5Pj_TqNTOU0C_1gPZTFA';
export const supabase = createClient(supabaseUrl, supabaseKey);

// Auth functions
export const signIn = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error signing in:', error);
      throw error;
    }
    const user = data.user;
    if (!user) {
      throw new Error('User not found');
    }
    // Fetch user data from 'users' table
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('uid', user.id)
      .single();

    if (userError) {
      console.error('Error fetching user data:', userError);
      throw userError;
    }

    return { id: userData.id, ...userData };
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

export const createUser = async (email: string, password: string, role: UserRole, name: string) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error creating user:', error);
      throw error;
    }
    const user = data.user;
    if (!user) {
      throw new Error('User not found');
    }

    const userData = {
      uid: user.id,
      email,
      name,
      role,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const { data: insertedUser, error: insertError } = await supabase
      .from('users')
      .insert([userData])
      .single();

    if (insertError) {
      console.error('Error inserting user data:', insertError);
      throw insertError;
    }

    return { id: insertedUser.id, ...insertedUser };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Team functions
export const createTeam = async (
  name: string,
  leaderId: string,
  territory: string,
  salesTarget: number
) => {
  try {
    const teamData = {
      name,
      leaderId,
      territory,
      salesTarget,
      memberIds: [leaderId],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const { data: team, error: teamError } = await supabase
      .from('teams')
      .insert([teamData])
      .single();

    if (teamError) {
      console.error('Error creating team:', teamError);
      throw teamError;
    }

    // Update the leader's user document with the team ID
    const { error: userError } = await supabase
      .from('users')
      .update({ teamId: team.id })
      .eq('uid', leaderId);

    if (userError) {
      console.error('Error updating leader user:', userError);
      throw userError;
    }

    return { id: team.id, ...team };
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

export const addTeamMember = async (
  teamId: string,
  data: {
    email: string;
    password: string;
    name: string;
    role: UserRole;
  }
) => {
  try {
    // Create the user account
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
    });

    if (authError) {
      console.error('Error creating user account:', authError);
      throw authError;
    }

    const user = authData.user;
    if (!user) {
      throw new Error('User not found');
    }

    // Create user record
    const userData = {
      uid: user.id,
      email: data.email,
      name: data.name,
      role: data.role,
      teamId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const { data: insertedUser, error: userError } = await supabase
      .from('users')
      .insert([userData])
      .single();

    if (userError) {
      console.error('Error inserting user data:', userError);
      throw userError;
    }

    // Update team members
    const { data: teamData, error: teamError } = await supabase
      .from('teams')
      .select('memberIds')
      .eq('id', teamId)
      .single();

    if (teamError) {
      console.error('Error fetching team data:', teamError);
      throw teamError;
    }

    const memberIds = teamData.memberIds || [];
    memberIds.push(insertedUser.uid);

    const { error: updateError } = await supabase
      .from('teams')
      .update({ memberIds, updatedAt: new Date() })
      .eq('id', teamId);

    if (updateError) {
      console.error('Error updating team members:', updateError);
      throw updateError;
    }

    return { id: insertedUser.id, ...insertedUser };
  } catch (error) {
    console.error('Error adding team member:', error);
    throw error;
  }
};

export default supabase;
