import User from './User';

export default class Admin extends User {
  isAdmin: boolean;
  
  constructor(name: string) {
    super(name);
    this.isAdmin = true;
  }
}
