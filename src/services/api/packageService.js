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
        { field: { Name: "package_name" } },
        { field: { Name: "price" } },
        { field: { Name: "validity_period" } },
        { field: { Name: "initial_token" } }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('package', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching packages:", error);
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
        { field: { Name: "package_name" } },
        { field: { Name: "price" } },
        { field: { Name: "validity_period" } },
        { field: { Name: "initial_token" } }
      ]
    };
    
    const response = await apperClient.getRecordById('package', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching package with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (packageData) => {
  await getRandomDelay(500, 1000);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Name: packageData.Name,
        Tags: packageData.Tags || '',
        Owner: packageData.Owner ? parseInt(packageData.Owner) : null,
        package_name: packageData.package_name,
        price: parseInt(packageData.price),
        validity_period: parseInt(packageData.validity_period),
        initial_token: parseInt(packageData.initial_token)
      }]
    };
    
    const response = await apperClient.createRecord('package', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} packages:${JSON.stringify(failedRecords)}`);
        
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
    console.error("Error creating package:", error);
    throw error;
  }
};

export const update = async (id, packageData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Id: parseInt(id),
        Name: packageData.Name,
        Tags: packageData.Tags,
        Owner: packageData.Owner ? parseInt(packageData.Owner) : null,
        package_name: packageData.package_name,
        price: parseInt(packageData.price),
        validity_period: parseInt(packageData.validity_period),
        initial_token: parseInt(packageData.initial_token)
      }]
    };
    
    const response = await apperClient.updateRecord('package', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} packages:${JSON.stringify(failedUpdates)}`);
        
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
    console.error("Error updating package:", error);
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
    
    const response = await apperClient.deleteRecord('package', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} packages:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting package:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createPackage = create;
export const getPackage = getById;
export const updatePackage = update;
export const deletePackage = deleteRecord;
export const getAllPackages = getAll;

export const getActivePackages = async () => {
  await getRandomDelay(300, 700);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "package_name" } },
        { field: { Name: "price" } },
        { field: { Name: "validity_period" } },
        { field: { Name: "initial_token" } }
      ],
      where: [
        {
          FieldName: "price",
          Operator: "GreaterThan",
          Values: ["0"]
        }
      ],
      orderBy: [
        {
          fieldName: "price",
          sorttype: "ASC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('package', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching active packages:", error);
    throw error;
  }
};