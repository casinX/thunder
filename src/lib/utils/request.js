import axios from 'axios';


export default async (url, methodType = 'GET', data = {}, options={}) => {
  const { config={}, multipartFormData=false } = options;
  const method = methodType.toLowerCase();
  const { headers={} } = config;
  if(multipartFormData){
    Object.assign(headers, { 'Content-Type': 'multipart/form-data' });
  }
  config.headers = headers;

  if(method === 'get'){
    config.params = data;
  }else{
    config.data = data;
  }

  const result = {
    response: null,
    error: null,
  };

  try {
    result.response = await axios({ method, url, ...config });
  }catch (error){
    result.error = error.response;
  }

  return result;
};