export default class BaseRepository {
  private $axios: any;
  
  constructor($axios: any) {
    this.$axios = $axios;
  }

  async get(url: string, params?: object) {
    try {      
      const response = await this.$axios.get(url, { params });
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }

  async post(url: string, data?: object) {
    try {
      const response = await this.$axios.post(url, data);
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }

  async put(url: string, data?: object) {
    try {
      const response = await this.$axios.put(url, data);
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }

  async delete(url: string, data?: object) {
    try {
      const response = await this.$axios.delete(url, data);
      return response;
    } catch (error: any) {
      console.log(error);
    }
  }
}
