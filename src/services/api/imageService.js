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
  await getRandomDelay(400, 800);
  
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
        { field: { Name: "file_name" } },
        { field: { Name: "file_path" } },
        { field: { Name: "file_size" } },
        { field: { Name: "image_type" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        },
        { 
          field: { Name: "landing_page" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('image', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching images:", error);
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
        { field: { Name: "file_name" } },
        { field: { Name: "file_path" } },
        { field: { Name: "file_size" } },
        { field: { Name: "image_type" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        },
        { 
          field: { Name: "landing_page" },
          referenceField: { field: { Name: "Name" } }
        }
      ]
    };
    
    const response = await apperClient.getRecordById('image', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching image with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (imageData) => {
  await getRandomDelay(500, 1000);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields with proper data formatting
    const params = {
      records: [{
        file_name: imageData.file_name,
        file_path: imageData.file_path,
        file_size: parseInt(imageData.file_size), // Number type
        image_type: imageData.image_type,
        project: parseInt(imageData.project),
        landing_page: parseInt(imageData.landing_page)
      }]
    };
    
    const response = await apperClient.createRecord('image', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} images:${JSON.stringify(failedRecords)}`);
        
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
    console.error("Error creating image:", error);
    throw error;
  }
};

export const update = async (id, imageData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields with proper data formatting
    const params = {
      records: [{
        Id: parseInt(id),
        file_name: imageData.file_name,
        file_path: imageData.file_path,
        file_size: parseInt(imageData.file_size), // Number type
        image_type: imageData.image_type,
        project: parseInt(imageData.project),
        landing_page: parseInt(imageData.landing_page)
      }]
    };
    
    const response = await apperClient.updateRecord('image', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} images:${JSON.stringify(failedUpdates)}`);
        
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
    console.error("Error updating image:", error);
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
    
    const response = await apperClient.deleteRecord('image', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} images:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting image:", error);
    throw error;
  }
};

export const getImagesByProject = async (projectId) => {
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
        { field: { Name: "file_name" } },
        { field: { Name: "file_path" } },
        { field: { Name: "file_size" } },
        { field: { Name: "image_type" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        },
        { 
          field: { Name: "landing_page" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      where: [
        {
          FieldName: "project",
          Operator: "EqualTo",
          Values: [parseInt(projectId)]
        }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('image', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching images by project:", error);
    throw error;
  }
};

export const getImagesByLandingPage = async (landingPageId) => {
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
        { field: { Name: "file_name" } },
        { field: { Name: "file_path" } },
        { field: { Name: "file_size" } },
        { field: { Name: "image_type" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        },
        { 
          field: { Name: "landing_page" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      where: [
        {
          FieldName: "landing_page",
          Operator: "EqualTo",
          Values: [parseInt(landingPageId)]
        }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('image', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching images by landing page:", error);
    throw error;
  }
};

export const getImagesByType = async (imageType) => {
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
        { field: { Name: "file_name" } },
        { field: { Name: "file_path" } },
        { field: { Name: "file_size" } },
        { field: { Name: "image_type" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        },
        { 
          field: { Name: "landing_page" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      where: [
        {
          FieldName: "image_type",
          Operator: "EqualTo",
          Values: [imageType]
        }
      ],
      orderBy: [
        {
          fieldName: "CreatedOn",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('image', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching images by type:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createImage = create;
export const getImage = getById;
export const updateImage = update;
export const deleteImage = deleteRecord;
export const getAllImages = getAll;