import "@4tw/cypress-drag-drop";

describe("service is available", function () {
  before(function () {
    cy.visit("http://localhost:3000/login/");
    cy.get(".input_type_email").type("sereban11@ya.ru");
    cy.get(".input_type_password").type("111");

    cy.get(".button").click();
  });
  it("открыть модальное окно", function () {
    cy.get("[class^=Ingredient_ingredient_link__]").first().as("ingredient");
    cy.get("@ingredient").click();

    cy.get("[class^=ModalOverlay_modal_button__]").as("modalButton");
    cy.get("@modalButton").click();

    cy.get("[class^=BurgerConstructor_drop_box__]").as("dropBox");

    cy.get("@ingredient").drag("@dropBox");

    cy.get("[class^=button]").as("orderButton");
    cy.get("@orderButton").click();
  });
});
