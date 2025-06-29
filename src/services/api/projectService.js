import { getRandomDelay } from '@/utils/helpers';
import { updateUserTokens } from './userService';

// Mock projects database
let projects = [
  {
    Id: 1,
    user_id: 1,
    product_name: "Nasi Gudeg Bu Sari",
    target_market: "Pekerja kantoran Jakarta yang suka makanan tradisional",
    benefits: "Rasa autentik Jogja, higienis, delivery cepat, harga terjangkau",
    selected_problem: "Harga Makanan Mahal Tapi Porsi Kecil",
    pattern_interrupt: "STOP! Jangan sampai Anda jadi korban makanan mahal porsi kecil...",
    html_code: "<html>Landing page content...</html>",
    status: "published",
    public_url: "nasi-gudeg-bu-sari-jakarta",
    created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    updated_at: new Date().toISOString()
  }
];

let nextProjectId = 2;

export const createProject = async (projectData) => {
  await getRandomDelay(500, 1000);

  // Deduct 1 token from user
  await updateUserTokens(projectData.user_id, 1, 'spend');

  const newProject = {
    Id: nextProjectId++,
    user_id: projectData.user_id,
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
  };

  projects.push(newProject);
  return newProject;
};

export const getUserProjects = async (userId) => {
  await getRandomDelay(300, 700);

  return projects
    .filter(project => project.user_id === userId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};

export const getProject = async (projectId) => {
  await getRandomDelay(200, 500);

  const project = projects.find(p => p.Id === projectId);
  if (!project) {
    throw new Error('Project tidak ditemukan');
  }

  return project;
};

export const getProjectByUrl = async (publicUrl) => {
  await getRandomDelay(200, 500);

  const project = projects.find(p => p.public_url === publicUrl && p.status === 'published');
  if (!project) {
    throw new Error('Landing page tidak ditemukan atau belum dipublish');
  }

  return project;
};

export const updateProject = async (projectId, updateData) => {
  await getRandomDelay(400, 800);

  const projectIndex = projects.findIndex(p => p.Id === projectId);
  if (projectIndex === -1) {
    throw new Error('Project tidak ditemukan');
  }

  projects[projectIndex] = {
    ...projects[projectIndex],
    ...updateData,
    updated_at: new Date().toISOString()
  };

  return projects[projectIndex];
};

export const publishProject = async (projectId) => {
  await getRandomDelay(600, 1200);

  const projectIndex = projects.findIndex(p => p.Id === projectId);
  if (projectIndex === -1) {
    throw new Error('Project tidak ditemukan');
  }

  const project = projects[projectIndex];
  
  // Generate public URL if not exists
  if (!project.public_url) {
    const baseUrl = project.product_name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    const timestamp = Date.now().toString().slice(-4);
    project.public_url = `${baseUrl}-${timestamp}`;
  }

  project.status = 'published';
  project.updated_at = new Date().toISOString();

  return {
    public_url: project.public_url,
    status: project.status
  };
};

export const deleteProject = async (projectId) => {
  await getRandomDelay(300, 600);

  const projectIndex = projects.findIndex(p => p.Id === projectId);
  if (projectIndex === -1) {
    throw new Error('Project tidak ditemukan');
  }

  projects.splice(projectIndex, 1);
  return { success: true };
};

export const getAllProjects = async () => {
  await getRandomDelay(400, 800);
  
  return projects.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
};