import { TNewOrderResponse } from '../../src/utils/burger-api';
import { TIngredient } from '../../src/utils/types';

const mockUserProfile = {
  email: 'basarus51@gmail.com',
  password: 'test'
};

const testUrl = 'http://localhost:4000/';
const baseUrl = 'https://norma.nomoreparties.space/api';

describe('Работа с ингредиентами', function () {
  const ingredients: TIngredient[] = (
    require('./mock/ingredients.json') as TIngredient[]
  )
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  Cypress.Commands.add('login', () => {
    cy.request({
      method: 'POST',
      url: baseUrl + '/auth/login',
      body: mockUserProfile
    }).then((resp) => {
      window.localStorage.setItem('accessToken', resp.body.accessToken);
    });
  });

  beforeEach(() => {
    cy.login();
    cy.intercept(baseUrl + '/ingredients', {
      success: true,
      data: ingredients
    });
  });

  it('Ингредиенты добавляются в заказ', function () {
    // Выбираем случайные булочки и начиночки
    cy.visit(testUrl);
    const bunUuid = ingredients.find((e) => e.type === 'bun')?._id;
    const fillingUuids = ingredients
      .filter((e) => e.type !== 'bun')
      .splice(0, 5)
      .map((e) => e._id);

    // Добавляем булочку и ингредиенты
    cy.get(`[data-cy=ing-${bunUuid}] > button`).click();
    fillingUuids.forEach((uuid) =>
      cy.get(`[data-cy=ing-${uuid}] > button`).click()
    );

    // Проверяем все ли булочки в корзине и совпадают ли они
    // Проверяем все ли ингредиенты в корзине
    fillingUuids.forEach((uuid) => cy.get(`[data-cy=ing-buy-${uuid}]`));
    cy.get(`[data-cy=bun-up-buy-${bunUuid}]`);
    cy.get(`[data-cy=bun-down-buy-${bunUuid}]`);
  });

  it('Модальное окно ингредиента открывается и закрывается на крест', function () {
    // Выбираем случайные булочки и начиночки
    cy.visit(testUrl);
    const bun = ingredients.find((e) => e.type === 'bun');
    if (!bun) return;
    // Открываем модальное окно
    cy.get(`[data-cy=ing-${bun._id}]`).click();
    cy.get('h3').contains('Детали ингредиента');
    cy.get('h3').contains(bun.name);
    cy.get(`button`).click();
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('Модальное окно ингредиента открывается и закрывается на клик вне формы', function () {
    // Выбираем случайные булочки
    cy.visit(testUrl);
    const bun = ingredients.find((e) => e.type === 'bun');

    if (!bun) return;
    // Открываем модальное окно
    cy.get(`[data-cy=ing-${bun._id}]`).click();
    cy.get('h3').contains('Детали ингредиента');
    cy.get('h3').contains(bun.name);
    cy.get(`body`).click(0, 0);
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('Создание заказа от неавторизованного пользователя', function () {
    // Выбираем случайные булочки
    cy.visit(testUrl);
    const orderData: TNewOrderResponse =
      require('./mock/order.json') as TNewOrderResponse;

    // Собираем моковый заказ
    orderData.order.ingredients.forEach((ingredient) => {
      cy.get(`[data-cy=ing-${ingredient}] > button`).click();
    });
    cy.get(`button`).contains('Оформить заказ').click();
    cy.intercept('POST', baseUrl + '/orders');
    cy.wait(5000);
    cy.get('h2').should('exist', /[^0-9]+/);
    cy.get(`body`).click(0, 0);
    cy.get(`[data-cy=modal]`).should('not.exist');
    cy.get(`[data-cy*=ing-buy-]`).should('not.exist');
  });
});
