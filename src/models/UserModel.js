export default class User{
  constructor(id, first_name, last_name, picture_url, created_at){
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.picture_url = picture_url;
    this.created_at = created_at
  }
}