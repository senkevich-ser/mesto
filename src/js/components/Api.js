export default class Api {
  constructor({ url, token, idGroup }) {
    this._url = url;
    this._token = token;
    this._idGroup = idGroup;
  }
  getCards() {
    return fetch(`${this._url}/v1/${this._idGroup}/cards`, {
      headers: {
        authorization: this._token
      }
    }).then(cards => {
      if (cards.ok) {
        return cards.json()
      } return Promise.reject(`Ошибка ${cards.status}при загрузке с сервера`)
    })
  }

  addCard(data) {
    return fetch(`${this._url}/v1/${this._idGroup}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(card => {
        if (card.ok) {
          return card.json()
        } return Promise.reject(`Ошибка ${cards.status}при загрузке с сервера`)
      })
  }

  _getResponseValue(response) {
    if (response.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}