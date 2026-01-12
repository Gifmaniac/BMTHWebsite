describe("Login page", () => {
  it("Normal user logs in successfully and navigates to the admin dashboard.", () => {
    cy.visit("/login");

    cy.log("Log in as a normal (none admin) user.")
    cy.contains("Email address")
      .parent()
      .find("input")
      .type("TestUser@bmth.com");

    cy.contains("Password")
      .parent()
      .find("input")
      .type("Test123!");

    cy.contains("button", "Sign in").click();

    cy.log("User is redirected to the main store page")
    cy.url().should("include", "/store");

    cy.log("User wants to see his/ her user settings and sees all the right buttons.")
    cy.contains("Account").click();

    cy.url().should("include", "/account")

    cy.contains("TestUser@bmth.com").should("be.visible");
    cy.contains("User").should("be.visible");
    cy.contains("button", "View Orders").should("be.visible");
    cy.contains("button", "Update Details").should("be.visible");
    cy.contains("button", "Support").should("be.visible");

    cy.log("User wants to see if it can go to the admin page but is blocked and gets redirected to the account page instead.")
    cy.visit("/admin");
    cy.url().should("include", "/account");
  });
});