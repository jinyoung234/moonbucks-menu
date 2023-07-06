import { $ } from "./util/dom.js";
import store from "./store/index.js";

function App() {
  this.menu = {
    espresso: [],
    frappuccino: [],
    blended: [],
    teavana: [],
    desert: [],
  };
  this.curCategory = "espresso";
  this.init = () => {
    const isStored = store.getLocalStorage();
    if (isStored) this.menu = store.getLocalStorage();
    render();
    initEventListeners();
  };

  const render = () => {
    const menuItemTemplate = this.menu[this.curCategory]
      .map(({ menuName }, i) => {
        return `<li data-menu-id="${i}" class="menu-list-item d-flex items-center py-2">
    <span class="${
      this.menu[this.curCategory][i].isSoldOut && "sold-out"
    } w-100 pl-2 menu-name">${menuName}</span>
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

  const addMenu = () => {
    const userMenuName = $("#menu-name").value;
    // 사용자 입력값이 빈 값이라면 추가되지 않으며 alert를 띄운다.
    if (userMenuName === "") {
      alert("값을 입력 해주세요");
      return;
    }

    this.menu[this.curCategory].push({ menuName: userMenuName });
    store.setLocalStorage(this.menu);

    render();

    // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    $("#menu-name").value = "";
  };

  const removeMenu = (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      const menuId = e.target.closest("li").dataset.menuId;
      this.menu[this.curCategory].splice(menuId, 1);
      store.setLocalStorage(this.menu);
      render();
    }
  };

  const updateMenuCount = () => {
    const menuCount = this.menu[this.curCategory].length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const menuId = e.target.closest("li").dataset.menuId;
    const updatedMenuName = prompt("메뉴를 수정해주세요.", $menuName.innerText);
    this.menu[this.curCategory][menuId].menuName = updatedMenuName;
    store.setLocalStorage(this.menu);
    render();
  };

  const updateSoldout = (e) => {
    const menuId = e.target.closest("li").dataset.menuId;
    this.menu[this.curCategory][menuId].isSoldOut = !this.menu[this.curCategory][menuId].isSoldOut;
    store.setLocalStorage(this.menu);
    render();
  };

  const initEventListeners = () => {
    $("nav").addEventListener("click", (e) => {
      const isCategoryNameButton = e.target.classList.contains("cafe-category-name");
      if (isCategoryNameButton) {
        this.curCategory = e.target.dataset.categoryName;
        $("#category-title").innerText = `${e.target.innerText} 메뉴 관리`;
        render();
      }
    });

    // 엔터 시 새로고침 되는 것을 막기 위해서 form 태그가 전송되는 것을 막아야 한다.
    $("#menu-form").addEventListener("submit", (e) => {
      e.preventDefault();
    });

    // 메뉴의 이름을 입력 받는다.
    $("#menu-name").addEventListener("keypress", (e) => {
      // enter 키를 누른게 아니라면 return 하여 영문 첫 글자 입력 시 alert가 뜨는 것을 방지
      if (e.key !== "Enter") return;
      addMenu();
    });

    // 확인 버튼을 눌렀을 때 메뉴를 추가 한다.
    $("#menu-submit-button").addEventListener("click", addMenu);

    // 수정 - 삭제
    $("#menu-list").addEventListener("click", (e) => {
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
    });
  };
}

// 앱 실행
const app = new App();
app.init();
