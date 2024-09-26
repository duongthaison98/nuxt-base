import BaseRepository from '../BaseRepository';

const entryPoint = '/users/api/v2.0';

export default class UserRepository extends BaseRepository {
  login = () => this.post(`${entryPoint}/account/web-login`);
  getCaptcha = () => this.get(`${entryPoint}/account/captcha`);
  register = (data: object) => this.post(`${entryPoint}/account/register`, data);
}