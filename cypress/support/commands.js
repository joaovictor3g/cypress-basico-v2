Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (mandatoryFields) => {
  const { firstName, lastName, email, help } = mandatoryFields;

  cy.get("input[id=firstName]")
    .type(firstName)
    .get("input[id=lastName")
    .type(lastName)
    .get("input[id=email]")
    .type(email)
    .get("textarea[id=open-text-area]")
    .type(help);

  cy.contains("button", "Enviar").click();
});
