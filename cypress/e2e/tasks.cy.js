describe('Tasks Management', () => {
  const baseUrl = 'http://localhost:3001';
  let createdTaskId;

  beforeEach(() => {
    cy.visit('http://localhost:8080/'); 
  });

  it('should validate inputs when saving an empty form', () => {
    cy.get('[data-from=0] > button').click();
    cy.get('#save-task').click();

    cy.get('.invalid-feedback').should('not.have.css', 'display', 'none');
  });

  it('should validate "taskname" input when leaving focus', () => {
    cy.get('[data-from=0] > button').click();
    cy.get('#taskname').click();
    cy.get('.modal-footer').click();    

    cy.get('#taskname').should('have.class', 'is-invalid');
  });  

  it('must enable "deadline" when enabling the switch', () => {
    cy.get('[data-from=0] > button').click();
    cy.get('#deadline').should('be.disabled');

    cy.get('#enable-deadline').click();
    cy.get('#deadline').should('be.enabled');
  });

  it('should validate "deadline" input when leaving focus', () => {
    cy.get('[data-from=0] > button').click();
    cy.get('#enable-deadline').click();
    cy.get('#deadline').click();
    cy.get('.modal-footer').click();

    cy.get('#deadline').should('have.class', 'is-invalid');
  });

  it('should create a new task in "todo" column', () => {
    cy.intercept('POST', `${baseUrl}/tasks`).as('createTask');

    cy.get('[data-from=0] > button').click();
    cy.get('#taskname').type('Cypress task');
    cy.get('#description').type('task created for e2e testing');
    cy.get('#save-task').click();

    cy.wait('@createTask').then((interception) => {
      expect(interception.response.statusCode).to.eq(201);
      createdTaskId = interception.response.body.id;
    });

    cy.get('#todo > task-card').should('contain', 'Cypress task');
  });

  it('should update a task in "todo" column', () => {
    cy.intercept('PUT', `${baseUrl}/tasks/${createdTaskId}`).as('updateTask');

    cy.get(`#todo > task-card[data-id="${createdTaskId}"]`)
      .should('exist')
      .shadow()
      .within(() => {
        cy.get(`.card-footer > [data-edit="${createdTaskId}"]`, { timeout: 10000 })
          .should('exist')
          .click();
      });

    cy.get('#taskname').clear().type('Cypress task updated');
    cy.get('#description').clear().type('Updated description for Cypress task');

    cy.get('#save-task').click();

    cy.wait('@updateTask').its('response.statusCode').should('eq', 200);

    cy.get(`#todo > task-card[data-id="${createdTaskId}"]`, { timeout: 10000 }).should('exist');
  });

  it('should delete a task in "todo" column', () => {
    cy.intercept('DELETE', `${baseUrl}/tasks/${createdTaskId}`).as('deleteTask');

    cy.on('window:confirm', (message) => {
      expect(message).to.equal('Tem certeza que deseja excluir esta tarefa?');
      return true;
    });
  
    cy.get(`#todo > task-card[data-id="${createdTaskId}"]`)
      .shadow()
      .within(() => {
        cy.get(`.card-footer > [data-delete="${createdTaskId}"]`, { timeout: 10000 })
          .should('exist')
          .click();
      });
  
    cy.wait('@deleteTask').then((interception) => {
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.get(`#todo > task-card[data-id="${createdTaskId}"]`, { timeout: 10000 }).should('not.exist');
  });
});