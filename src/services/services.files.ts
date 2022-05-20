import axios from 'axios';
import { API_URL } from '../common/common.constants';
import { FileInfo, TaskInfo } from '../common/common.types';
import authService from './services.auth';
import { IResponceError } from './services.types';

const upload = async (task: TaskInfo, files: FileList) => {
  const formData = new FormData();
  formData.append('taskId', task.id);
  formData.append('file', files[0]);
  try {
    const resp = await axios.post(API_URL + `file`, formData, {
      headers: {
        Authorization: `Bearer ${authService.getToken()}`,
        'Content-type': 'multipart/form-data',
      },
    });
    return resp.data;
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const download = async (task: TaskInfo, file: FileInfo) => {
  try {
    const resp = await axios.get(API_URL + `file/${task.id}/${file.filename}`, {
      ...authService.getConfig(),
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${file.filename}`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  } catch (error) {
    throw new Error((error as IResponceError).response.data.message);
  }
};

const filesService = {
  upload,
  download,
};

export default filesService;
