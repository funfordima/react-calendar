export default class User {
  id: string;

  name: string;
  
  isActive: boolean;

  constructor(name: string) {
    this.id = `f${(+new Date()).toString(16)}`;
    this.name = name;
    this.isActive = true;
  }
}
