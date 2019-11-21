export default class Task{
  constructor(id, name, description, duration, scheduled, completed, userID){
    this.id = id;
    this.name = name;
    this.description = description;
    this.duration = duration;
    this.scheduled = scheduled;
    this.completed = completed;
    this.userID = userID;
  }
}