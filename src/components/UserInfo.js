export class UserInfo {
  // Constructor to initialize user info elements
  constructor({ nameSelector, jobSelector }) {
    this.nameElement = document.querySelector(nameSelector);
    this.jobElement = document.querySelector(jobSelector);
  }

  // Public method to get user info
  getUserInfo() {
    return {
      name: this.nameElement.textContent,
      job: this.jobElement.textContent,
    };
  }

  // Public method to set user info
  setUserInfo({ name, job }) {
    this.nameElement.textContent = name;
    this.jobElement.textContent = job;
  }
}
