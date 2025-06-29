import { getRandomDelay } from '@/utils/helpers';

// Initialize ApperClient
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK;
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  });
};

export const getAll = async () => {
  await getRandomDelay(300, 700);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "email" } },
        { field: { Name: "wa_number" } },
        { field: { Name: "token_balance" } },
        { field: { Name: "subscription_status" } },
        { field: { Name: "CreatedOn" } }
      ]
    };
    
    const response = await apperClient.fetchRecords('app_User', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getById = async (id) => {
  await getRandomDelay(200, 500);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "email" } },
        { field: { Name: "wa_number" } },
        { field: { Name: "token_balance" } },
        { field: { Name: "subscription_status" } },
        { field: { Name: "CreatedOn" } }
      ]
    };
    
    const response = await apperClient.getRecordById('app_User', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (userData) => {
  await getRandomDelay(800, 1500);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Name: userData.name,
        email: userData.email,
        wa_number: userData.wa_number,
        password: userData.password,
        token_balance: userData.token_balance || 5,
        subscription_status: "active"
      }]
    };
    
    const response = await apperClient.createRecord('app_User', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} users:${JSON.stringify(failedRecords)}`);
        
        failedRecords.forEach(record => {
          record.errors?.forEach(error => {
            throw new Error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulRecords[0]?.data;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const update = async (id, userData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Id: parseInt(id),
        Name: userData.name,
        email: userData.email,
        wa_number: userData.wa_number,
        token_balance: userData.token_balance,
        subscription_status: userData.subscription_status
      }]
    };
    
    const response = await apperClient.updateRecord('app_User', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} users:${JSON.stringify(failedUpdates)}`);
        
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            throw new Error(`${error.fieldLabel}: ${error.message}`);
          });
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulUpdates[0]?.data;
    }
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

export const deleteRecord = async (id) => {
  await getRandomDelay(300, 600);
  
  try {
    const apperClient = getApperClient();
    const params = {
      RecordIds: [parseInt(id)]
    };
    
    const response = await apperClient.deleteRecord('app_User', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} users:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createUser = create;
export const getUserById = getById;
export const getAllUsers = getAll;

export const loginUser = async (email, password) => {
  await getRandomDelay(500, 1000);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "email" } },
        { field: { Name: "wa_number" } },
        { field: { Name: "token_balance" } },
        { field: { Name: "subscription_status" } }
      ],
      where: [
        {
          FieldName: "email",
          Operator: "EqualTo",
          Values: [email]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('app_User', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    const users = response.data || [];
    const user = users.find(u => u.email === email);
    
    if (!user) {
      throw new Error('Email tidak ditemukan. Silakan daftar terlebih dahulu.');
    }
    
    // In a real implementation, you would verify the password hash
    // For now, we'll use ApperUI authentication instead
    return user;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const updateUserTokens = async (userId, tokenAmount, type = 'spend') => {
  await getRandomDelay(300, 600);
  
  try {
    // First get the current user
    const user = await getById(userId);
    if (!user) {
      throw new Error('User tidak ditemukan');
    }
    
    let newTokenBalance = user.token_balance;
    
    if (type === 'spend') {
      if (user.token_balance < tokenAmount) {
        throw new Error('Token tidak cukup. Silakan beli token tambahan.');
      }
      newTokenBalance = user.token_balance - tokenAmount;
    } else if (type === 'add') {
      newTokenBalance = user.token_balance + tokenAmount;
    }
    
    // Update the user with new token balance
    const updatedUser = await update(userId, {
      ...user,
      token_balance: newTokenBalance
    });
    
    return updatedUser;
  } catch (error) {
    console.error("Error updating user tokens:", error);
    throw error;
  }
};