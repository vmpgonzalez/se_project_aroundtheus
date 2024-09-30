export class UserInfo {
  // Constructor to initialize user info elements
  constructor({ nameSelector, jobSelector }) {
    this.nameElement = document.querySelector(nameSelector); // Select the name element
    this.jobElement = document.querySelector(jobSelector); // Select the job element
  }

  // Public method to get user info
  getUserInfo() {
    return {
      name: this.nameElement.textContent, // Get current name
      job: this.jobElement.textContent, // Get current job
    };
  }

  // Public method to set user info
  setUserInfo({ name, job }) {
    this.nameElement.textContent = name; // Set new name
    this.jobElement.textContent = job; // Set new job
  }
}
