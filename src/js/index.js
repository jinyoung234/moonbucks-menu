// step1 요구사항 구현을 위한 전략

// TODO 메뉴 추가
// - [v] 메뉴의 이름을 입력 받고 엔터키 입력으로 추가한다.
// - [v] 사용자 입력값이 빈 값이라면 추가되지 않는다.
// - [v] 추가되는 메뉴의 아래 마크업은 `<ul id="espresso-menu-list" class="mt-3 pl-0"></ul>` 안에 삽입해야 한다.
// - [v] 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
// - [v] 총 메뉴 갯수를 count하여 상단에 보여준다.

// TODO 메뉴 수정
// - [v] 메뉴의 수정 버튼 클릭 이벤트를 받고, 메뉴 수정하는 prompt 창이 뜬다.
// - [v] 모달 창에서 신규 메뉴명을 입력 받고, 확인 버튼을 누르면 메뉴가 수정 된다.

// TODO 메뉴 삭제
// - [v] 메뉴 삭제 버튼 클릭 이벤트를 받고, 메뉴 삭제하는 confirm 창이 뜬다.
// - [v] 확인 버튼을 이용하여 메뉴를 삭제 할 수 있다.
// - [v] 총 메뉴 갯수를 count하여 상단에 보여준다.

const $ = (selector) => document.querySelector(selector);

const App = () => {
  const addMenu = () => {
    const userMenuName = $("#espresso-menu-name").value;
    // 사용자 입력값이 빈 값이라면 추가되지 않으며 alert를 띄운다.
    if (userMenuName === "") {
      alert("값을 입력 해주세요");
      return;
    }
    const menuItemTemplate = (userMenuName) => {
      return `<li class="menu-list-item d-flex items-center py-2">
              <span class="w-100 pl-2 menu-name">${userMenuName}</span>
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
    };
    $("#espresso-menu-list").insertAdjacentHTML("beforeend", menuItemTemplate(userMenuName));
    // 총 메뉴 갯수를 count하여 상단에 보여준다.
    updateMenuCount();
    // 메뉴가 추가되고 나면, input은 빈 값으로 초기화한다.
    $("#espresso-menu-name").value = "";
  };

  const removeMenu = (e) => {
    if (confirm("메뉴를 삭제하시겠습니까?")) {
      e.target.closest("li").remove();
      updateMenuCount();
    }
  };

  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  const updateMenuName = (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");
    const updatedMenuName = prompt("메뉴를 수정해주세요.", $menuName.innerText);
    $menuName.innerText = updatedMenuName;
  };

  // 엔터 시 새로고침 되는 것을 막기 위해서 form 태그가 전송되는 것을 막아야 한다.
  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  // 메뉴의 이름을 입력 받는다.
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    // enter 키를 누른게 아니라면 return 하여 영문 첫 글자 입력 시 alert가 뜨는 것을 방지
    if (e.key !== "Enter") return;
    addMenu();
  });

  // 확인 버튼을 눌렀을 때 메뉴를 추가 한다.
  $("#espresso-menu-submit-button").addEventListener("click", addMenu);

  // 수정 - 삭제
  $("#espresso-menu-list").addEventListener("click", (e) => {
    const isElement = (elementName) => e.target.classList.contains(elementName);
    // 수정 버튼을 눌렀을 경우 수정이 가능 해야 한다.
    if (isElement("menu-edit-button")) {
      updateMenuName(e);
    }

    // 삭제 버튼을 누를 경우 삭제가 가능해야 한다.
    if (isElement("menu-remove-button")) {
      removeMenu(e);
    }
  });
};

// 앱 실행
App();
