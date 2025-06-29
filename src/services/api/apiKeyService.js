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
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } },
        { field: { Name: "ModifiedOn" } },
        { field: { Name: "ModifiedBy" } },
        { field: { Name: "provider" } },
        { field: { Name: "key_value" } },
        { field: { Name: "is_default" } }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('api_key', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching API keys:", error);
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
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } },
        { field: { Name: "ModifiedOn" } },
        { field: { Name: "ModifiedBy" } },
        { field: { Name: "provider" } },
        { field: { Name: "key_value" } },
        { field: { Name: "is_default" } }
      ]
    };
    
    const response = await apperClient.getRecordById('api_key', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching API key with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (apiKeyData) => {
  await getRandomDelay(500, 1000);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Name: apiKeyData.Name,
        Tags: apiKeyData.Tags || '',
        Owner: apiKeyData.Owner ? parseInt(apiKeyData.Owner) : null,
        provider: apiKeyData.provider,
        key_value: apiKeyData.key_value,
        is_default: Boolean(apiKeyData.is_default)
      }]
    };
    
    const response = await apperClient.createRecord('api_key', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} API keys:${JSON.stringify(failedRecords)}`);
        
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
    console.error("Error creating API key:", error);
    throw error;
  }
};

export const update = async (id, apiKeyData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Id: parseInt(id),
        Name: apiKeyData.Name,
        Tags: apiKeyData.Tags,
        Owner: apiKeyData.Owner ? parseInt(apiKeyData.Owner) : null,
        provider: apiKeyData.provider,
        key_value: apiKeyData.key_value,
        is_default: Boolean(apiKeyData.is_default)
      }]
    };
    
    const response = await apperClient.updateRecord('api_key', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} API keys:${JSON.stringify(failedUpdates)}`);
        
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
    console.error("Error updating API key:", error);
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
    
    const response = await apperClient.deleteRecord('api_key', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} API keys:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting API key:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createApiKey = create;
export const getApiKey = getById;
export const updateApiKey = update;
export const deleteApiKey = deleteRecord;
export const getAllApiKeys = getAll;

export const getDefaultApiKey = async () => {
  await getRandomDelay(200, 500);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "provider" } },
        { field: { Name: "key_value" } },
        { field: { Name: "is_default" } }
      ],
      where: [
        {
          FieldName: "is_default",
          Operator: "EqualTo",
          Values: [true]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('api_key', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    const apiKeys = response.data || [];
    const defaultKey = apiKeys.find(key => key.is_default === true);
    
    if (!defaultKey) {
      throw new Error('No default API key found');
    }
    
    return defaultKey;
  } catch (error) {
    console.error("Error fetching default API key:", error);
    throw error;
  }
};

export const getApiKeysByProvider = async (provider) => {
  await getRandomDelay(300, 600);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "provider" } },
        { field: { Name: "key_value" } },
        { field: { Name: "is_default" } }
      ],
      where: [
        {
          FieldName: "provider",
          Operator: "EqualTo",
          Values: [provider]
        }
      ],
      orderBy: [
        {
          fieldName: "is_default",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('api_key', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching API keys by provider:", error);
    throw error;
  }
};