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
        { field: { Name: "title" } },
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
    
    const response = await apperClient.fetchRecords('landing_page_draft', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching landing page drafts:", error);
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
        { field: { Name: "title" } },
        { field: { Name: "content" } },
        { field: { Name: "url" } },
        { 
          field: { Name: "project" },
          referenceField: { field: { Name: "Name" } }
        }
      ]
    };
    
    const response = await apperClient.getRecordById('landing_page_draft', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching landing page draft with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (draftData) => {
  await getRandomDelay(500, 1000);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        title: draftData.title,
        content: draftData.content,
        url: draftData.url,
        project: parseInt(draftData.project)
      }]
    };
    
    const response = await apperClient.createRecord('landing_page_draft', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} landing page drafts:${JSON.stringify(failedRecords)}`);
        
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
    console.error("Error creating landing page draft:", error);
    throw error;
  }
};

export const update = async (id, draftData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Id: parseInt(id),
        title: draftData.title,
        content: draftData.content,
        url: draftData.url,
        project: parseInt(draftData.project)
      }]
    };
    
    const response = await apperClient.updateRecord('landing_page_draft', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} landing page drafts:${JSON.stringify(failedUpdates)}`);
        
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
    console.error("Error updating landing page draft:", error);
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
    
    const response = await apperClient.deleteRecord('landing_page_draft', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} landing page drafts:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting landing page draft:", error);
    throw error;
  }
};

export const getDraftsByProject = async (projectId) => {
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
        { field: { Name: "title" } },
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
    
    const response = await apperClient.fetchRecords('landing_page_draft', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching project landing page drafts:", error);
    throw error;
  }
};

export const getDraftByUrl = async (url) => {
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
        { field: { Name: "title" } },
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
    
    const response = await apperClient.fetchRecords('landing_page_draft', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    const drafts = response.data || [];
    const draft = drafts.find(d => d.url === url);
    
    if (!draft) {
      throw new Error('Landing page draft not found');
    }
    
    return draft;
  } catch (error) {
    console.error("Error fetching landing page draft by URL:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createDraft = create;
export const getDraft = getById;
export const updateDraft = update;
export const deleteDraft = deleteRecord;
export const getAllDrafts = getAll;