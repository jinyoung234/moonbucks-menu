/**
 *  TODO 서버 요청 부분
 * - [v] 웹 서버를 띄운다.
 * - [v] 서버에 새로운 메뉴명을 추가될 수 있도록 요청한다.
 * - [v] 서버에 품절 상태를 요청한다.
 * - [v] 서버에 카테고리 별 메뉴 리스트를 요청한다.
 * - [v] 서버에 메뉴가 수정 될 수 있도록 요청한다.
 * - [v] 서버에 메뉴의 품절 상태가 토글될 수 있도록 요청한다.
 * - [v] 서버에 메뉴가 삭제 될 수 있도록 요청한다.
 *
 *
 * TODO 리팩터링
 * - [v] localStorage에 저장하는 로직은 지운다.
 * - [v] fetch 비동기 api를 사용하는 부분을 async await을 사용하여 구현한다.
 *
 * TODO 사용자 경험
 * - [v] API 통신이 실패하는 경우에 대해 사용자가 알 수 있게 alert으로 예외처리를 진행한다.
 * - [v] 중복되는 메뉴는 추가할 수 없다.
 */

import { $ } from "./util/dom.js";
import MENU_API from "./api/index.js";

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.curCategory = "espresso";
  this.init = async () => {
    render();
    initEventListeners();
  };

  const render = async () => {
    this.menu[this.curCategory] = await MENU_API.getAllMenuByCategory(this.curCategory);
    const menuItemTemplate = this.menu[this.curCategory]
      .map(({ name, id }, i) => {
        return `<li data-menu-id="${id}" class="menu-list-item d-flex items-center py-2">
    <span class="${
      this.menu[this.curCategory][i].isSoldOut && "sold-out"
    } w-100 pl-2 menu-name">${name}</span>
    <button
    type="button"
    class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
  >
    품절
  </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
    >
      수정
    </button>
    <button
      type="button"
      class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
    >
      삭제
    </button>
  </li>`;
      })
      .join("");

    $("#menu-list").innerHTML = menuItemTemplate;
    // 총 메뉴 갯수를 count하여 상단에 보여준다.
    updateMenuCount();
  };

  const addMenu = async () => {
    const userMenuName = $("#menu-name").value;
    // 사용자 입력값이 빈 값이라면 추가되지 않으며 alert를 띄운다.
    if (userMenuName === "") {
      alert("값을 입력 해주세요");
      return;
    }

    const isDuplicateItem = this.menu[this.curCategory].find((item) => item.name === userMenuName);

    if (userMenuName.length < 2) {
      alert("메뉴는 2글자 이상 부터 가능해요.");
      $("#menu-name").value = "";
      return;
    }

    if (isDuplicateItem) {
      alert("중복되는 메뉴가 존재해요 :(");
      $("#menu-name").value = "";
      return;
    }

    await MENU_API.createMenu(this.curCategory, userMenuName);
    render();
    // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    $("#menu-name").value = "";
  };

  const removeMenu = async (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      await MENU_API.deleteMenu(this.curCategory, menuId);
      render();
    }
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.curCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const updateMenuName = async (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const menuId = e.target.closest("li").dataset.menuId;
    const updatedMenuName = prompt("메뉴를 수정해주세요.", $menuName.innerText);
    await MENU_API.updateMenu(this.curCategory, updatedMenuName, menuId);
    render();
  };

  const updateSoldout = async (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    await MENU_API.toggleSoldOutMenu(this.curCategory, menuId);
    render();
  };

  const handleChangeCategory = async (e) => {
    const isCategoryNameButton = e.target.classList.contains("cafe-category-name");
    if (isCategoryNameButton) {
      this.curCategory = e.target.dataset.categoryName;
      $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
      const data = await MENU_API.getAllMenuByCategory(this.curCategory);
      this.menu[this.curCategory] = data;
      render();
    }
  };

  const handlePreventForm = (e) => {
    e.preventDefault();
  };

  const handleInputMenu = (e) => {
    // enter 키를 누른게 아니라면 return 하여 영문 첫 글자 입력 시 alert가 뜨는 것을 방지
    if (e.key !== "Enter") return;
    addMenu();
  };

  const handleButtonClick = (e) => {
    const isElement = (elementName) => e.target.classList.contains(elementName);
    // 수정 버튼을 눌렀을 경우 수정이 가능 해야 한다.
    if (isElement("menu-edit-button")) {
      updateMenuName(e);
      return;
    }

    // 삭제 버튼을 누를 경우 삭제가 가능해야 한다.
    if (isElement("menu-remove-button")) {
      removeMenu(e);
      return;
    }

    if (isElement("menu-sold-out-button")) {
      updateSoldout(e);
      return;
    }
  };

  const initEventListeners = () => {
    $("nav").addEventListener("click", handleChangeCategory);

    // 엔터 시 새로고침 되는 것을 막기 위해서 form 태그가 전송되는 것을 막아야 한다.
    $("#menu-form").addEventListener("submit", handlePreventForm);

    // 메뉴의 이름을 입력 받는다.
    $("#menu-name").addEventListener("keypress", handleInputMenu);

    // 확인 버튼을 눌렀을 때 메뉴를 추가 한다.
    $("#menu-submit-button").addEventListener("click", addMenu);

    // 수정 - 삭제
    $("#menu-list").addEventListener("click", handleButtonClick);
  };
}

// 앱 실행
const app = new App();
app.init();
