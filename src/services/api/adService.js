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
        { field: { Name: "ad_copy" } },
        { field: { Name: "target_audience" } },
        { field: { Name: "budget" } },
        { field: { Name: "campaign_start_date" } },
        { field: { Name: "campaign_end_date" } },
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
    
    const response = await apperClient.fetchRecords('ad', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching ads:", error);
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
        { field: { Name: "ad_copy" } },
        { field: { Name: "target_audience" } },
        { field: { Name: "budget" } },
        { field: { Name: "campaign_start_date" } },
        { field: { Name: "campaign_end_date" } },
        { 
          field: { Name: "landing_page" },
          referenceField: { field: { Name: "Name" } }
        }
      ]
    };
    
    const response = await apperClient.getRecordById('ad', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching ad with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (adData) => {
  await getRandomDelay(500, 1000);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields with proper data formatting
    const params = {
      records: [{
        ad_copy: adData.ad_copy,
        target_audience: adData.target_audience,
        budget: parseFloat(adData.budget),
        campaign_start_date: adData.campaign_start_date, // ISO format date (YYYY-MM-DD)
        campaign_end_date: adData.campaign_end_date, // ISO format date (YYYY-MM-DD)
        landing_page: parseInt(adData.landing_page)
      }]
    };
    
    const response = await apperClient.createRecord('ad', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} ads:${JSON.stringify(failedRecords)}`);
        
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
    console.error("Error creating ad:", error);
    throw error;
  }
};

export const update = async (id, adData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields with proper data formatting
    const params = {
      records: [{
        Id: parseInt(id),
        ad_copy: adData.ad_copy,
        target_audience: adData.target_audience,
        budget: parseFloat(adData.budget),
        campaign_start_date: adData.campaign_start_date, // ISO format date (YYYY-MM-DD)
        campaign_end_date: adData.campaign_end_date, // ISO format date (YYYY-MM-DD)
        landing_page: parseInt(adData.landing_page)
      }]
    };
    
    const response = await apperClient.updateRecord('ad', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} ads:${JSON.stringify(failedUpdates)}`);
        
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
    console.error("Error updating ad:", error);
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
    
    const response = await apperClient.deleteRecord('ad', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} ads:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting ad:", error);
    throw error;
  }
};

export const getAdsByLandingPage = async (landingPageId) => {
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
        { field: { Name: "ad_copy" } },
        { field: { Name: "target_audience" } },
        { field: { Name: "budget" } },
        { field: { Name: "campaign_start_date" } },
        { field: { Name: "campaign_end_date" } },
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
    
    const response = await apperClient.fetchRecords('ad', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching ads by landing page:", error);
    throw error;
  }
};

export const getActiveAds = async () => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } },
        { field: { Name: "CreatedOn" } },
        { field: { Name: "CreatedBy" } },
        { field: { Name: "ModifiedOn" } },
        { field: { Name: "ModifiedBy" } },
        { field: { Name: "ad_copy" } },
        { field: { Name: "target_audience" } },
        { field: { Name: "budget" } },
        { field: { Name: "campaign_start_date" } },
        { field: { Name: "campaign_end_date" } },
        { 
          field: { Name: "landing_page" },
          referenceField: { field: { Name: "Name" } }
        }
      ],
      whereGroups: [
        {
          operator: "AND",
          subGroups: [
            {
              conditions: [
                {
                  fieldName: "campaign_start_date",
                  operator: "LessThanOrEqualTo",
                  values: [currentDate]
                }
              ]
            },
            {
              conditions: [
                {
                  fieldName: "campaign_end_date",
                  operator: "GreaterThanOrEqualTo",
                  values: [currentDate]
                }
              ]
            }
          ]
        }
      ],
      orderBy: [
        {
          fieldName: "campaign_start_date",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('ad', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching active ads:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createAd = create;
export const getAd = getById;
export const updateAd = update;
export const deleteAd = deleteRecord;
export const getAllAds = getAll;