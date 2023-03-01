// CAC-TAT.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

/// <reference types="Cypress" />

const data = {
  firstName: "Joao Victor",
  lastName: "Dias Barroso",
  email: "joao@email.com",
  help: "Quero uma ajuda",
};

const dataWithBadFormattedEmail = {
  ...data,
  email: "joao,email,com",
};

describe("Central de atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });

  it("should verify the application title", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("should fill up the required fields and submit the form", () => {
    cy.fillMandatoryFieldsAndSubmit(data);

    cy.get(".success").should("be.visible");
  });

  it("should show an error message on submitting a form with invalid email formatting", () => {
    cy.fillMandatoryFieldsAndSubmit(dataWithBadFormattedEmail);
    cy.get(".error").should("be.visible");
  });

  it("should be empty when typing in phone field something different from numbers", () => {
    cy.get("input[id=phone]").type("any text").should("be.empty");
  });

  it("should show an error messagem when phone turns required, but it's not filled up before the form submitting", () => {
    cy.get("input[id=phone-checkbox]").check();
    cy.contains("button", "Enviar").click().get(".error").should("be.visible");
  });

  it("should clear all filled up fields after submit", () => {
    const firstName = cy
      .get("input[id=firstName]")
      .type("Joao Victor")
      .should("have.value", "Joao Victor");

    const lastName = cy
      .get("input[id=lastName")
      .type("Dias Barroso")
      .should("have.value", "Dias Barroso");

    const email = cy
      .get("input[id=email]")
      .type("jvdias@email.com")
      .should("have.value", "jvdias@email.com");

    const help = cy
      .get("textarea[id=open-text-area]")
      .type("Quero uma ajuda")
      .should("have.value", "Quero uma ajuda");

    firstName.clear().should("be.empty");
    lastName.clear().should("be.empty");
    email.clear().should("be.empty");
    help.clear().should("be.empty");

    cy.contains("button", "Enviar").click();
  });

  it("should show error message when submitting a form without fill up all required fields", () => {
    cy.get('button[type="submit"]').click().get(".error").should("be.visible");
  });

  it("should submit the form using the custom command", () => {
    cy.fillMandatoryFieldsAndSubmit(data);
    cy.get(".success").should("be.visible");
  });

  it("should select the product (YouTube) by text", () => {
    cy.get("select[id=product]")
      .select("YouTube")
      .should("have.value", "youtube");
  });

  it("should select the product (Mentoria) by value", () => {
    cy.get("select[id=product]")
      .select("mentoria")
      .should("have.value", "mentoria");
  });

  it("should select the product (Blog) by index", () => {
    cy.get("select[id=product]").select(1).should("have.value", "blog");
  });

  it("should mark the attendance with 'Feedback'", () => {
    cy.get("input[type=radio][value=feedback]")
      .check()
      .should("have.value", "feedback");
  });

  it("should mark each attendance type", () => {
    cy.get("input[type=radio]")
      .should("have.length", 3)
      .each(($radio) => {
        cy.wrap($radio).check().should("be.checked");
      });
  });

  it("should check both checkboxes after that uncheck the last one", () => {
    cy.get("input[type=checkbox]")
      .check()
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("should select a file from fixtures folder", () => {
    cy.get("input[type=file]")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should(($input) => {
        expect($input[0].files[0].name).eq("example.json");
      });
  });

  it("should select a file from fixtures folder (drag-and-drop)", () => {
    cy.get("input[type=file]")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should(($input) => {
        expect($input[0].files[0].name).eq("example.json");
      });
  });

  it("should select a file using an alias fixture", () => {
    cy.fixture("example.json").as("sampleFile");

    cy.get("input[type=file]")
      .should("not.have.value")
      .selectFile("@sampleFile")
      .then(($input) => {
        const files = $input[0].files;
        expect(files[0].name).to.equal("example.json");
      });
  });

  it("should open a new tab without a click", () => {
    cy.get("#privacy > a").should("have.attr", "target", "_blank");
  });

  it("should open the privacy policy page removing the target and then clicking in the link", () => {
    cy.get("#privacy > a")
      .invoke("removeAttr", "target")
      .click()
      .title()
      .should(
        "eq",
        "Central de Atendimento ao Cliente TAT - Política de privacidade"
      );
  });
});
