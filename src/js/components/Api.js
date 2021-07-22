export default class Api{
  constructor({url,token,idGroup}){
    this._url = url;
    this._token = token;
    this._idGroup = idGroup;
  }
  getCards(){
    return fetch(`${this._url}/v1/${this._idGroup}/cards`,{
      headers:{
        authorization: this._token
      }
    }).then(cards=>{
      if(cards.ok){
        return cards.json()
      } return Promise.reject(`Ошибка ${cards.ok}при загрузке с сервера`)
    })
  }
}