export class Api {
  constructor() {
    this.url = "http://localhost:3033";
  }

  userLogin(username, password) {
    let url = this.url + "/user/login";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  }

  userRegister(username, password) {
    let url = this.url + "/user/register";
    console.log(url);
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        user: {
          username: username,
          password: password,
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      return response.json();
    });
  }
}
