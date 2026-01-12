describe("Login page", () => {
  it("logs in successfully", () => {
    cy.visit("/login");

    cy.contains("Email address")
      .parent()
      .find("input")
      .type("Admin@bmth.com");

    cy.contains("Password")
      .parent()
      .find("input")
      .type("Admin123!");

    cy.contains("button", "Sign in").click();


    cy.url().should("include", "/store");

    cy.contains("Admin").click();

    cy.url().should("include", "/admin")

    cy.contains("button", "Delete Product").should("be.visible");
    cy.contains("button", "Update Inventory").should("be.visible");
    cy.contains("button", "View Orders").should("be.visible");
    cy.contains("button", "Moderate Users").should("be.visible");
    cy.contains("button", "Reviews").should("be.visible");
    cy.contains("button", "View Reports").should("be.visible");
  });
});