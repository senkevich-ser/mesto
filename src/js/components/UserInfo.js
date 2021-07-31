export default class UserInfo {
  constructor(nameElement, rankElement, avatarImage) {
    this._nameTitle = document.querySelector(nameElement);
    this._rankTitle = document.querySelector(rankElement);
    this._avatarImage = document.querySelector(avatarImage);
  }

  getUserInfo() {
    return {
      name: this._nameTitle.textContent,
      description: this._rankTitle.textContent,
      url: this._avatarImage.src,
    };
  }

  setUserInfo(data) {
    this._nameTitle.textContent = data.name;
    this._rankTitle.textContent = data.about;
  }
  setAvatar(data){
    this._avatarImage.src = data.avatar; 
  }
  setId(data){
return data._id
  }
}
