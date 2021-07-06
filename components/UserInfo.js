export default class UserInfo {
  constructor(nameElement, rankElement) {
    this._nameTitle = document.querySelector(nameElement);
    this._rankTitle = document.querySelector(rankElement);
  }


  getUserInfo() {
    return {
    name :this._nameTitle.textContent,
    description: this._rankTitle.textContent,
    }
  }



  setUserInfo(data) {
    this._nameTitle.textContent = data.initialExplorer;
    this._rankTitle.textContent = data.rankExplorer;
  }
}