it("should test the privacy policy page independently", () => {
  cy.visit("./src/privacy.html");

  cy.title().should(
    "eq",
    "Central de Atendimento ao Cliente TAT - Política de privacidade"
  );
});
