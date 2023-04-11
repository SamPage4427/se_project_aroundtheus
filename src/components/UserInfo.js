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
