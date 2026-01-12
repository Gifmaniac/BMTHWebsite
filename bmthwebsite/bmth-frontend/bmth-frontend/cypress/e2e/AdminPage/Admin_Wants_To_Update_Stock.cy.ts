describe("Admin update stock", () => {
  it("updates stock without persisting changes", () => {
    cy.log("Makes sure that the info doesnt get send to the DB")
    let productDetail;

    cy.intercept("GET", "**/api/store/apparel/*", (req) => {
      req.continue((res) => {
        productDetail = res.body;
      });
    }).as("productDetail");

    cy.intercept("PATCH", "**/api/store/apparel/*/*/*", (req) => {
      if (productDetail) {
        req.reply({ statusCode: 200, body: productDetail });
      } else {
        req.continue();
      }
    }).as("updateStock");

    cy.log("User logs in on a admin account")
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

    cy.log("User is redirected to the main store page")
    cy.url().should("include", "/store");

    cy.log("User wants to go to the admin pannel")
    cy.contains("Admin").click();
    cy.url().should("include", "/admin");

    cy.contains("button", "Update Inventory").click();

    cy.log("User wants to update stock")
    cy.url().should("include", "view=inventory");
    cy.contains("Update stock per variant").should("be.visible");

    cy.get('[aria-labelledby="product-select-label"]').click();
    cy.get('ul[role="listbox"] li').eq(1).click();

    cy.wait("@productDetail");

    cy.get('[aria-labelledby="color-select-label"]').click();
    cy.get('ul[role="listbox"] li').first().click();

    cy.get('[aria-labelledby="variant-select-label"]').click();
    cy.get('ul[role="listbox"] li').first().click();

    cy.contains("Amount to add/remove")
      .parent()
      .find("input")
      .clear()
      .type("1");

    cy.contains("button", "Apply stock update").click();

    cy.wait("@updateStock").its("response.statusCode").should("eq", 200);
    cy.contains("Stock updated.").should("be.visible");
  });
});
