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
        { field: { Name: "page_title" } },
        { field: { Name: "content" } },
        { field: { Name: "url" } },
        { 
          field: { Name: "project" },
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
    
    const response = await apperClient.fetchRecords('app_landingpage', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching landing pages:", error);
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
        { field: { Name: "page_title" } },
        { field: { Name: "content" } },
        { field: { Name: "url" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        }
      ]
    };
    
    const response = await apperClient.getRecordById('app_landingpage', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching landing page with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (landingPageData) => {
  await getRandomDelay(500, 1000);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        page_title: landingPageData.page_title,
        content: landingPageData.content,
        url: landingPageData.url,
        project: parseInt(landingPageData.project)
      }]
    };
    
    const response = await apperClient.createRecord('app_landingpage', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} landing pages:${JSON.stringify(failedRecords)}`);
        
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
    console.error("Error creating landing page:", error);
    throw error;
  }
};

export const update = async (id, landingPageData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Id: parseInt(id),
        page_title: landingPageData.page_title,
        content: landingPageData.content,
        url: landingPageData.url,
        project: parseInt(landingPageData.project)
      }]
    };
    
    const response = await apperClient.updateRecord('app_landingpage', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} landing pages:${JSON.stringify(failedUpdates)}`);
        
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
    console.error("Error updating landing page:", error);
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
    
    const response = await apperClient.deleteRecord('app_landingpage', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} landing pages:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting landing page:", error);
    throw error;
  }
};

export const getLandingPagesByProject = async (projectId) => {
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
        { field: { Name: "page_title" } },
        { field: { Name: "content" } },
        { field: { Name: "url" } },
        { 
          field: { Name: "project" },
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
    
    const response = await apperClient.fetchRecords('app_landingpage', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching project landing pages:", error);
    throw error;
  }
};

export const getLandingPageByUrl = async (url) => {
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
        { field: { Name: "page_title" } },
        { field: { Name: "content" } },
        { field: { Name: "url" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      where: [
        {
          FieldName: "url",
          Operator: "EqualTo",
          Values: [url]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('app_landingpage', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    const landingPages = response.data || [];
    const landingPage = landingPages.find(lp => lp.url === url);
    
    if (!landingPage) {
      throw new Error('Landing page tidak ditemukan');
    }
    
    return landingPage;
  } catch (error) {
    console.error("Error fetching landing page by URL:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createLandingPage = create;
export const getLandingPage = getById;
export const updateLandingPage = update;
export const deleteLandingPage = deleteRecord;
export const getAllLandingPages = getAll;