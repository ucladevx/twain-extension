export default class Task{
  constructor(id, title, duration, description){
    this.id = id;
    this.title = title;
    this.scheduledDate= '';
    this.duration= duration;
    this.dueDate = new Date().toDateString();
    this.startTime = '';
    this.endTime = '';
    this.category = '';
    this.notes= description;
    this.created = '';
    this.scheduled = false;
    this.completed = false;
    this.calendarId = 0;
  }
}
