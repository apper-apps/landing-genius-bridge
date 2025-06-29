import { getRandomDelay } from '@/utils/helpers';
import { updateUserTokens } from './userService';

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
        { field: { Name: "user_id" } },
        { field: { Name: "product_name" } },
        { field: { Name: "target_market" } },
        { field: { Name: "benefits" } },
        { field: { Name: "selected_problem" } },
        { field: { Name: "pattern_interrupt" } },
        { field: { Name: "html_code" } },
        { field: { Name: "status" } },
        { field: { Name: "public_url" } },
        { field: { Name: "created_at" } },
        { field: { Name: "updated_at" } }
      ],
      orderBy: [
        {
          fieldName: "created_at",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('project', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
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
        { field: { Name: "user_id" } },
        { field: { Name: "product_name" } },
        { field: { Name: "target_market" } },
        { field: { Name: "benefits" } },
        { field: { Name: "selected_problem" } },
        { field: { Name: "pattern_interrupt" } },
        { field: { Name: "html_code" } },
        { field: { Name: "status" } },
        { field: { Name: "public_url" } },
        { field: { Name: "created_at" } },
        { field: { Name: "updated_at" } }
      ]
    };
    
    const response = await apperClient.getRecordById('project', parseInt(id), params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error fetching project with ID ${id}:`, error);
    throw error;
  }
};

export const create = async (projectData) => {
  await getRandomDelay(500, 1000);
  
  try {
    // Deduct 1 token from user
    await updateUserTokens(projectData.user_id, 1, 'spend');

    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        user_id: parseInt(projectData.user_id),
        product_name: projectData.product_name,
        target_market: projectData.target_market,
        benefits: projectData.benefits,
        selected_problem: projectData.selected_problem || '',
        pattern_interrupt: projectData.pattern_interrupt || '',
        html_code: projectData.html_code || '',
        status: 'draft',
        public_url: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]
    };
    
    const response = await apperClient.createRecord('project', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulRecords = response.results.filter(result => result.success);
      const failedRecords = response.results.filter(result => !result.success);
      
      if (failedRecords.length > 0) {
        console.error(`Failed to create ${failedRecords.length} projects:${JSON.stringify(failedRecords)}`);
        
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
    console.error("Error creating project:", error);
    throw error;
  }
};

export const update = async (id, projectData) => {
  await getRandomDelay(400, 800);
  
  try {
    const apperClient = getApperClient();
    
    // Only include updateable fields
    const params = {
      records: [{
        Id: parseInt(id),
        product_name: projectData.product_name,
        target_market: projectData.target_market,
        benefits: projectData.benefits,
        selected_problem: projectData.selected_problem,
        pattern_interrupt: projectData.pattern_interrupt,
        html_code: projectData.html_code,
        status: projectData.status,
        public_url: projectData.public_url,
        updated_at: new Date().toISOString()
      }]
    };
    
    const response = await apperClient.updateRecord('project', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success);
      const failedUpdates = response.results.filter(result => !result.success);
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} projects:${JSON.stringify(failedUpdates)}`);
        
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
    console.error("Error updating project:", error);
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
    
    const response = await apperClient.deleteRecord('project', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    if (response.results) {
      const successfulDeletions = response.results.filter(result => result.success);
      const failedDeletions = response.results.filter(result => !result.success);
      
      if (failedDeletions.length > 0) {
        console.error(`Failed to delete ${failedDeletions.length} projects:${JSON.stringify(failedDeletions)}`);
        
        failedDeletions.forEach(record => {
          if (record.message) throw new Error(record.message);
        });
      }
      
      return successfulDeletions.length > 0;
    }
  } catch (error) {
    console.error("Error deleting project:", error);
    throw error;
  }
};

// Legacy methods for backward compatibility
export const createProject = create;
export const getProject = getById;
export const updateProject = update;
export const deleteProject = deleteRecord;
export const getAllProjects = getAll;

export const getUserProjects = async (userId) => {
  await getRandomDelay(300, 700);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "user_id" } },
        { field: { Name: "product_name" } },
        { field: { Name: "target_market" } },
        { field: { Name: "benefits" } },
        { field: { Name: "selected_problem" } },
        { field: { Name: "pattern_interrupt" } },
        { field: { Name: "html_code" } },
        { field: { Name: "status" } },
        { field: { Name: "public_url" } },
        { field: { Name: "created_at" } },
        { field: { Name: "updated_at" } }
      ],
      where: [
        {
          FieldName: "user_id",
          Operator: "EqualTo",
          Values: [parseInt(userId)]
        }
      ],
      orderBy: [
        {
          fieldName: "created_at",
          sorttype: "DESC"
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('project', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    return response.data || [];
  } catch (error) {
    console.error("Error fetching user projects:", error);
    throw error;
  }
};

export const getProjectByUrl = async (publicUrl) => {
  await getRandomDelay(200, 500);
  
  try {
    const apperClient = getApperClient();
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "user_id" } },
        { field: { Name: "product_name" } },
        { field: { Name: "target_market" } },
        { field: { Name: "benefits" } },
        { field: { Name: "selected_problem" } },
        { field: { Name: "pattern_interrupt" } },
        { field: { Name: "html_code" } },
        { field: { Name: "status" } },
        { field: { Name: "public_url" } },
        { field: { Name: "created_at" } },
        { field: { Name: "updated_at" } }
      ],
      where: [
        {
          FieldName: "public_url",
          Operator: "EqualTo",
          Values: [publicUrl]
        },
        {
          FieldName: "status",
          Operator: "EqualTo",
          Values: ["published"]
        }
      ]
    };
    
    const response = await apperClient.fetchRecords('project', params);
    
    if (!response.success) {
      console.error(response.message);
      throw new Error(response.message);
    }
    
    const projects = response.data || [];
    const project = projects.find(p => p.public_url === publicUrl && p.status === 'published');
    
    if (!project) {
      throw new Error('Landing page tidak ditemukan atau belum dipublish');
    }
    
    return project;
  } catch (error) {
    console.error("Error fetching project by URL:", error);
    throw error;
  }
};

export const publishProject = async (projectId) => {
  await getRandomDelay(600, 1200);
  
  try {
    // First get the current project
    const project = await getById(projectId);
    if (!project) {
      throw new Error('Project tidak ditemukan');
    }
    
    // Generate public URL if not exists
    let publicUrl = project.public_url;
    if (!publicUrl) {
      const baseUrl = project.product_name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
      
      const timestamp = Date.now().toString().slice(-4);
      publicUrl = `${baseUrl}-${timestamp}`;
    }
    
    // Update the project with published status and URL
    const updatedProject = await update(projectId, {
      ...project,
      status: 'published',
      public_url: publicUrl
    });
    
    return {
      public_url: publicUrl,
      status: 'published'
    };
  } catch (error) {
    console.error("Error publishing project:", error);
    throw error;
  }
};