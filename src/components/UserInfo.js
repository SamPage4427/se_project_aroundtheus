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
    };
    return userData;
  }

  getAvatarInfo() {
    return this._avatar;
  }

  setUserInfo({ name, about }) {
    this._user.textContent = name;
    this._about.textContent = about;
  }

  setAvatarInfo({ name, avatar }) {
    this._avatar.src = avatar;
    this._avatar.alt = name;
  }
}

export default UserInfo;
