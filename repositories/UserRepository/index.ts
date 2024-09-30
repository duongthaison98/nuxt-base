import service from "../BaseRepository";

const entryPoint = '/users/api/v2.0';

const UserRepository = {
  login(data: { username: string, password: string }) {
    return service.post(`${entryPoint}/account/login/web`, data);
  },
  getUserInfo() {
    return service.get(`/community/api/v2.0/user-info`);
  }
}

export default UserRepository;