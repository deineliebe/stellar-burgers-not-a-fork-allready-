import type {} from 'cypress';

const ingredientInfoModal = 'Детали ингредиента';
const orderNumber = '1';

const baseURL = 'http://localhost:4000';
const modal = '[data-cy=modal]';
const closeModalButton = '[data-cy=modal-close]';
const upperBun = '[data-cy=upper-bun]';
const lowerBun = '[data-cy=lower-bun]';
const ingredient = '[data-cy=constructor-element]';
const ingredientBun = '[data-cy=ingredient-bun]';
const ingredientMain = '[data-cy="ingredient-main"]';
const ingredientSauce = '[data-cy="ingredient-sauce"]';
const testBun = 'Флюоресцентная булка R2-D3';
const testIngredientDetails = {
  "_id": "643d69a5c3f7b9001cfa0944",
  "name": "Соус традиционный галактический",
  "type": "sauce",
  "proteins": 42,
  "fat": 24,
  "carbohydrates": 42,
  "calories": 99,
  "price": 15,
  "image": "https://code.s3.yandex.net/react/code/sauce-03.png",
  "image_mobile": "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
  "image_large": "https://code.s3.yandex.net/react/code/sauce-03-large.png",
  "__v": 0
}

beforeEach(() => {
  window.localStorage.setItem('refreshToken', JSON.stringify('refreshToken'));
  cy.setCookie('accessToken', 'dsfsdrandom-cookiesad214as32');
  cy.intercept('GET', 'api/auth/user', { fixture: 'userData.json' });
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  cy.visit(baseURL);
});

afterEach(function () {
  cy.clearLocalStorage();
  cy.clearCookies();
});

describe('[Cypress] Добавление ингредиента из списка ингредиентов в конструктор', function () {
  it('Добавление булки', () => {
    cy.get(upperBun).should('not.exist');
    cy.get(lowerBun).should('not.exist');
    cy.get(ingredientBun).contains('Добавить').click();
    cy.get(upperBun).contains('верх').should('exist');
    cy.get(lowerBun).contains('низ').should('exist');
  });

  it('Добавление основного ингредиента', () => {
    cy.get(ingredient).should('not.exist');
    cy.get(ingredientMain).contains('Добавить').click();
    cy.get(ingredient).contains('Биокотлета').should('exist');
  });

  it('Добавление соуса', () => {
    cy.get(ingredient).should('not.exist');
    cy.get(ingredientSauce).contains('Добавить').click();
    cy.get(ingredient).contains('Соус').should('exist');
  });
});

describe('[Cypress] Открытие и закрытие модального окна с описанием ингредиента', function () {
  it('Открытие модального окна', () => {
    cy.get(modal).should('not.exist');
    cy.contains(testBun).click();
    cy.contains(ingredientInfoModal).should('exist');
    cy.get(modal).should('exist');
  });
  
  it('Закрытие модального окна', () => {
    cy.contains(testBun).click();
    cy.contains(ingredientInfoModal).should('exist');
    cy.get(closeModalButton).click();
    cy.get(modal).should('not.exist');
  });
});

describe('[Cypress] Отображение в открытом модальном окне данных ингредиента', function () {
  it('Проверка данных', () => {
    cy.contains(testIngredientDetails.name).click();
    cy.get('#modals').contains(testIngredientDetails.name).should('exist');
    cy.get('#modals').contains(testIngredientDetails.calories).should('exist');
    cy.get('#modals').contains(testIngredientDetails.carbohydrates).should('exist');
    cy.get('#modals').contains(testIngredientDetails.fat).should('exist');
    cy.get('#modals').contains(testIngredientDetails.proteins).should('exist');
    cy.get(closeModalButton).click();
  });
    
});

describe('[Cypress] Процесс создания заказа', function () {
  it('Создание заказа', function () {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.get(ingredientBun).contains('Добавить').click();
    cy.get(ingredientMain).contains('Добавить').click();
    cy.get(ingredientSauce).contains('Добавить').click();
    cy.get('[data-cy=create-order]').click();
    cy.get('[data-cy=order-number]').contains(orderNumber).should('exist');
    cy.get(closeModalButton).click();
    cy.get(upperBun).should('not.exist');
    cy.get(ingredient).should('not.exist');
    cy.get(ingredient).should('not.exist');
    cy.get(lowerBun).should('not.exist');
  });
});