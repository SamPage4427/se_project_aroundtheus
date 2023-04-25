class UserInfo {
  constructor({ name, about, avatar }) {
    this._user = name;
    this._about = about;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userData = {
      name: this._user.textContent,
      about: this._about.textContent,
      avatar: this._avatar,
    };
    return userData;
  }

  setUserInfo({ name, about, avatar }) {
    this._user.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
    this._avatar.alt = name;
  }
}

export default UserInfo;
