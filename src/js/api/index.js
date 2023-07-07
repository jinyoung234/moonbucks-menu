const BASE_URL = "http://localhost:3000/api";

const ENDPOINT = {
  menu(category) {
    return `category/${category}/menu`;
  },
  menuId(category, menuId) {
    return `${this.menu(category)}/${menuId}`;
  },
  soldOut(category, menuId) {
    return `${this.menuId(category, menuId)}/soldout`;
  },
};

const HTTP_METHOD = {
  post(name) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: name && JSON.stringify({ name }),
    };
  },
  put(name) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: name && JSON.stringify({ name }),
    };
  },
  delete() {
    return {
      method: "DELETE",
    };
  },
};

const request = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("문제가 발생했어요 :(");
    return;
  }
  return response.json();
};

const requestNotJson = async (url, option) => {
  const response = await fetch(url, option);
  if (!response.ok) {
    alert("문제가 발생했어요 :(");
    return;
  }
  return response;
};

const MENU_API = {
  async getAllMenuByCategory(category) {
    return request(`${BASE_URL}/${ENDPOINT.menu(category)}`);
  },
  async createMenu(category, name) {
    return request(`${BASE_URL}/${ENDPOINT.menu(category)}`, HTTP_METHOD.post(name));
  },
  async updateMenu(category, name, menuId) {
    return request(`${BASE_URL}/${ENDPOINT.menuId(category, menuId)}`, HTTP_METHOD.put(name));
  },
  async toggleSoldOutMenu(category, menuId) {
    return request(`${BASE_URL}/${ENDPOINT.soldOut(category, menuId)}`, HTTP_METHOD.put());
  },
  async deleteMenu(category, menuId) {
    return requestNotJson(`${BASE_URL}/${ENDPOINT.menuId(category, menuId)}`, HTTP_METHOD.delete());
  },
};

export default MENU_API;
