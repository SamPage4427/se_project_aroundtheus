/* object with user's name and user's job
public method getUserInfo() returns object with users info
public method setUserInfo() takes new user data and adds it to the page */
class UserInfo {
  constructor({ name, job }) {
    this._user = document.querySelector(name);
    this._job = document.querySelector(job);
  }

  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      job: this._job.textContent,
    };
    return userData;
  }

  setUserInfo(name, job) {
    this._user.textContent = name;
    this._job.textContent = job;
  }
}

export default UserInfo;
