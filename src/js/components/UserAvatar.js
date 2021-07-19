export default class UserAvatar {
  constructor(avatarEl) {
    this._avatarEl = document.querySelector(avatarEl);
  }


  setUserAvatar(data) {
    this._avatarEl.src = data.linkAvatar;
  }
}