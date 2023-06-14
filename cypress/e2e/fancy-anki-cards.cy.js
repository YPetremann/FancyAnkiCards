/// <reference types="cypress" />

function trimNL(...args) {
  const raw = String.raw(...args);
  const string = raw.trimStart();
  const nl = raw.slice(0, raw.length - string.length);
  return string.split(nl).join("  \n");
}
before(() => {
  cy.intercept({ method: "GET", url: "/deck.json" }, [
    {
      Deck: "Test::Deck",
      Recto: "Initial Card",
      Verso: "Should Load Properly",
      Tags: "Test Deck",
    },
    {
      Recto: trimNL`
        \`\`\`js
        console.log('plop')
        console.log('plop')
        console.log('plop')
        \`\`\`
        `,
      Verso: trimNL`
        \`\`\`js
        console.log('plop')
        console.log('plop')
        console.log('plop')
        \`\`\`
        `,
      Deck: "Test::Deck",
      Tags: "Test Deck",
    },
    {
      Recto: trimNL`
        *mark*
        **bold**
        _italic_
        __underline__
        ***___all___***
        `,
      Verso: "(Back 2)",
      Deck: "Test::Deck",
      Tags: "Test Deck",
    },
    {
      Recto: "(Front 3)",
      Verso: "(Back 3)",
      Deck: "Test::Deck",
      Tags: "Test Deck",
    },
  ]);
  cy.visit("/");
});
function nextCard() {
  cy.get("#ansarea>:not(#ansbut):not(.d-none)>:last-child>button").click();
  cy.get(".tags li");
  cy.get("#ansbuta").click();
}

describe("Card 1: Basic card", () => {
  before(nextCard);
  it("Small Mobile", () => {
    cy.viewport(320, 640);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 320);
  });
  it("Large Mobile", () => {
    cy.viewport(425, 640);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 425);
  });
  it("Tablet Mobile", () => {
    cy.viewport(768, 640);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 640);
  });
  it("Small Netbook", () => {
    cy.viewport(1024, 768);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 640);
  });
  it("Large Netbook", () => {
    cy.viewport(1280, 768);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 640);
  });
  it("Small Desktop", () => {
    cy.viewport(1440, 768);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 640);
  });
  it("Normal Desktop", () => {
    cy.viewport(1920, 1080);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 640);
  });
  it("Large Desktop", () => {
    cy.viewport(2560, 1080);
    cy.get("#qa").invoke("outerWidth").should("be.equal", 640);
  });
});

describe("Card 2: code", () => {
  before(nextCard);
  it("should display nicely", () => {
    cy.get("header pre code");
  });
});

describe("Card 3: markings", () => {
  before(nextCard);
  it("shoudl display nicely", () => {
    cy.get(".breadcrumb").should("contain.html", "Test :: Deck");
  });
});

describe("Card 4: markings", () => {
  before(nextCard);
  it("shoudl display nicely", () => {
    cy.get(".breadcrumb").should("contain.html", "Test :: Deck");
  });
});
