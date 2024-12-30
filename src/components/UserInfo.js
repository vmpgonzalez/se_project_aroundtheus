export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
    this._userId = null;
  }

  setUserInfo({ name, job, avatar, _id }) {
    if (name) this._nameElement.textContent = name;
    if (job) this._jobElement.textContent = job;
    if (avatar) this._avatarElement.src = avatar;
    if (_id) {
      this._userId = _id;
    } else {
      console.warn("User ID (_id) is undefined. Skipping userId update.");
    }
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
      avatar: this._avatarElement.src,
      _id: this._userId,
    };
  }
}
