const store = {
  setLocalStorage(menuItem) {
    localStorage.setItem("menuName", JSON.stringify(menuItem));
  },
  getLocalStorage() {
    return JSON.parse(localStorage.getItem("menuName"));
  },
};

export default store;
