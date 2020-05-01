/// <reference types="Cypress" />

import { DASHBOARD_PAGE_OBJECT } from "../../src/pages/Dashboard/index.test.page";
import { MANAGE_POST_PAGE_OBJECT } from "../../src/pages/Dashboard/components/ManagePost/index.test.page";
import { POST_DETAILS_PAGE_OBJECT } from "../../src/pages/Dashboard/components/PostDetails/index.test.page";
import { POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT } from "../../src/pages/Dashboard/components/PostDetails/components/Alert/index.test.page";

// This suite is oriented to real E2E testing, so, in a real App, server should be a development one.
describe("Dashboard main test", () => {
  const randomId = Math.floor(Math.random() * Math.random() * 1000);
  const MAX_RESPONSE_TIME = 2000; // For API perfomance testing.

  const samplePost = {
    title: `Sample Title ${randomId}`,
    content: "Sample Content",
    imageUrl:
      "https://lp-cms-production.imgix.net/2019-06/iStock_000057564776Large.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
    lat: "59.9134757",
    long: "10.7519453",
  };

  beforeEach(() => {
    cy.server();
  });

  describe("Main happy flow: ", () => {
    beforeEach(() => {});

    it("Loads the main Dashboard page", () => {
      cy.visit("http://localhost:3000");

      cy.get(`[data-testid=${DASHBOARD_PAGE_OBJECT.addButton}]`).should(
        "be.visible"
      );
    });

    it("should open the Add Post form when click on Add Button", () => {
      cy.get(`[data-testid=${DASHBOARD_PAGE_OBJECT.addButton}]`).click();

      cy.get(`[data-testid=${MANAGE_POST_PAGE_OBJECT.title}]`).contains(
        "Add a new post"
      );
    });

    it("should enable the Save Button when required fields are fullfilled", () => {
      cy.get(`[data-testid=${MANAGE_POST_PAGE_OBJECT.acceptButton}]`).should(
        "be.disabled"
      );

      cy.get(`[id=${MANAGE_POST_PAGE_OBJECT.titleInput}]`).type(
        samplePost.title
      );
      cy.get(`[id=${MANAGE_POST_PAGE_OBJECT.contentInput}]`).type(
        samplePost.content
      );

      cy.get(`[data-testid=${MANAGE_POST_PAGE_OBJECT.acceptButton}]`).should(
        "be.enabled"
      );

      cy.get(`[id=${MANAGE_POST_PAGE_OBJECT.imageUrlInput}]`).type(
        samplePost.imageUrl
      );

      cy.get(`[id=${MANAGE_POST_PAGE_OBJECT.latInput}]`).type(samplePost.lat);

      cy.get(`[id=${MANAGE_POST_PAGE_OBJECT.longInput}]`).type(samplePost.long);
    });

    it("when click Add Button adds a new post", () => {
      cy.route("GET", "/api/v1/posts").as("newPost");

      cy.get(`[data-testid=${MANAGE_POST_PAGE_OBJECT.acceptButton}]`).click();
      cy.wait(MAX_RESPONSE_TIME);

      cy.get(`[data-testid=${DASHBOARD_PAGE_OBJECT.grid}]`)
        .children()
        .last()
        .contains(samplePost.title);
    });

    it("when click the new Post should open details and contain the right info", () => {
      cy.get(`[data-testid=${DASHBOARD_PAGE_OBJECT.grid}]`)
        .children()
        .last()
        .click();

      cy.get(`[data-testid=${POST_DETAILS_PAGE_OBJECT.title}]`).contains(
        samplePost.title
      );
      cy.get(`[data-testid=${POST_DETAILS_PAGE_OBJECT.content}]`).contains(
        samplePost.content
      );
    });

    it("when click the Close button the dialog should be closed", () => {
      cy.get(`[data-testid=${POST_DETAILS_PAGE_OBJECT.closeButton}]`).click();

      cy.get(`[data-testid=${POST_DETAILS_PAGE_OBJECT.title}]`).should(
        "not.be.visible"
      );
    });

    it("when click the Edit button of the post should open the edit dialog", () => {
      cy.get(`[data-testid=${DASHBOARD_PAGE_OBJECT.grid}]`)
        .children()
        .last()
        .children()
        .children()
        .first()
        .click();

      cy.get(`[data-testid=${MANAGE_POST_PAGE_OBJECT.title}]`).contains(
        "Modify"
      );
      cy.get(`[data-testid=${MANAGE_POST_PAGE_OBJECT.acceptButton}]`).contains(
        "Update"
      );
    });

    it("when changes the title and click Update the post will be modified ", () => {
      cy.get(`[id=${MANAGE_POST_PAGE_OBJECT.titleInput}]`).type("MODIFIED");

      cy.get(`[data-testid=${MANAGE_POST_PAGE_OBJECT.acceptButton}]`).click();
      cy.wait(MAX_RESPONSE_TIME);

      cy.get(`[data-testid=${DASHBOARD_PAGE_OBJECT.grid}]`)
        .children()
        .last()
        .click();

      cy.get(`[data-testid=${POST_DETAILS_PAGE_OBJECT.title}]`).contains(
        "MODIFIED"
      );
    });

    it("when click on Delete button the delete dialog should appear", () => {
      cy.get(`[data-testid=${POST_DETAILS_PAGE_OBJECT.deleteButton}]`).click();

      cy.get(
        `[data-testid=${POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT.title}]`
      ).contains(`to delete this post?`);
    });

    it("when click on Delete the delete dialog should dissapear and the post be removed", () => {
      cy.get(
        `[data-testid=${POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT.deleteButton}]`
      ).click();
      cy.wait(MAX_RESPONSE_TIME);

      cy.get(
        `[data-testid=${POST_DETAILS_DELETE_OVERLAY_PAGE_OBJECT.title}]`
      ).should("not.be.visible");

      cy.get(`[data-testid=${DASHBOARD_PAGE_OBJECT.grid}]`)
        .children()
        .last()
        .should("not.contain", `Sample Title ${randomId}`);
    });
  });
});
