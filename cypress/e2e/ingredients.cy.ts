type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

type TServerResponse<T> = {
  success: boolean;
} & T;

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
  status: boolean;
}>;

type TOrderOwner = {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
};

type TOrder = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: TIngredient[];
  owner: TOrderOwner;
};

describe('Работа с ингредиентами', function () {
  const ingredients: TIngredient[] = (
    require('./mock/ingredients.json') as TIngredient[]
  )
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  it('Заходим на сайт конструктора заказа', function () {
    cy.visit('http://localhost:4000');
  });

  it('Ингредиенты приходят по запросу и соответствуют мок данным', function () {
    cy.intercept(
      'https://norma.nomoreparties.space/api/ingredients',
      ingredients
    );
  });

  it('Ингредиенты добавляются в заказ: булки', function () {
    cy.visit('http://localhost:4000/');

    // Выбираем случайные булочки и начиночки
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
    cy.visit('http://localhost:4000/');

    // Выбираем случайные булочки и начиночки
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
    cy.visit('http://localhost:4000/');

    // Выбираем случайные булочки
    const bun = ingredients.find((e) => e.type === 'bun');

    if (!bun) return;
    // Открываем модальное окно
    cy.get(`[data-cy=ing-${bun._id}]`).click();
    cy.get('h3').contains('Детали ингредиента');
    cy.get('h3').contains(bun.name);
    cy.get(`body`).click(0, 0);
    cy.get(`[data-cy=modal]`).should('not.exist');
  });

  it('Создание заказа от неавторизованного пользователя (c последующей авторизацией)', function () {
    cy.visit('http://localhost:4000/');

    // Выбираем случайные булочки
    const orderData: TNewOrderResponse =
      require('./mock/order.json') as TNewOrderResponse;

    // Собираем моковый заказ
    orderData.order.ingredients.forEach((ingredient) => {
      cy.get(`[data-cy=ing-${ingredient._id}] > button`).click();
    });

    cy.get(`button`).contains('Оформить заказ').click();
    cy.get('input[name=email]').type(orderData.order.owner.email);
    cy.get('input[name=password]').type('test');
    cy.get(`button`).contains('Войти').click();
    cy.get(`button`).contains('Оформить заказ').click();
    cy.intercept(
      'POST',
      'https://norma.nomoreparties.space/api/orders',
      (req) => {
        // Проверка что заказ правильно обработался
        req.continue((res) => {
          const actual = {
            name: res.body.name,
            owner: res.body.order.owner.email,
            ingredients: res.body.order.ingredients
          };
          const expected = {
            name: orderData.name,
            owner: orderData.order.owner.email,
            ingredients: orderData.order.ingredients
          };

          expect(actual).to.deep.equal(expected);
          res.send();
        });
      }
    ).as('createOrder');
    const response = cy.wait('@createOrder').its('response');
    response.then((res) => {
      // Проверка что в модальном окне номер заказа правильный
      cy.get('h2').contains(res?.body.order.number);
    });
    cy.get(`body`).click(0, 0);
    cy.get(`[data-cy=modal]`).should('not.exist');
    cy.get(`[data-cy*=ing-buy-]`).should('not.exist');
  });
});
