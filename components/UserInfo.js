export default class UserInfo {
  constructor(nameElement, rankElement) {
    this._nameTitle = document.querySelector(nameElement);
    this._rankTitle = document.querySelector(rankElement);
  }


  getUserInfo() {
    this._userData = {};
    this._userData.name = this._nameTitle.textContent;
    this._userData.rank = this._rankTitle.textContent;
    return this._userData;
  }



  setUserInfo(data) {
    this._nameTitle.textContent = data.initialExplorer;
    this._rankTitle.textContent = data.rankExplorer;
  }
}