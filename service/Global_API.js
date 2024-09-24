import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

if (!API_KEY) {
  console.error("API key is missing. Please set VITE_STRAPI_API_KEY in your environment variables.");
}

const axiosClient = axios.create({
  baseURL: 'http://localhost:1337/api/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`
  }
});

const handleResponse = (response) => response.data;

const handleError = (error) => {
  console.error('API call failed. Error:', error.response ? error.response.data : error.message);
  throw error;
};

const CreateNewResume = (data) => axiosClient.post('/user-resumes', data).then(handleResponse).catch(handleError);

const GetResumes = (userEmail) => axiosClient.get('/user-resumes?filters[userEmail][$eq]=' + userEmail).then(handleResponse).catch(handleError);

const UpdateResume = (id, data) => axiosClient.put('/user-resumes/'+id,data).then(handleResponse).catch(handleError);

const GetResumeInfo = (id) => axiosClient.get('/user-resumes/'+id+"?populate=*").then(handleResponse).catch(handleError);

const DeleteResume = (id) => axiosClient.delete('/user-resumes/'+id).then(handleResponse).catch(handleError);

export default {
  CreateNewResume,
  GetResumes,
  UpdateResume,
  GetResumeInfo,
  DeleteResume
};
