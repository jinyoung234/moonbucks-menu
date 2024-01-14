export const template = `
    <main class="mt-10 d-flex justify-center">
        <div class="wrapper bg-white p-10">
            <div class="heading d-flex justify-between">
                <h2 class="mt-1">☕ 에스프레소 메뉴 관리</h2>
                <menu-count></menu-count>
            </div>
            <menu-input-form></menu-input-form>
            <menu-list id="espresso-menu-list" class="mt-3 pl-0"></menu-list>
        </div>
    </main>
`;
