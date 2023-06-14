describe('template spec', () => {
  it('test todo component', () => {
    // * on accéde aux site todolist
    cy.visit('http://localhost:3000/deployFrontTodo')

    // * Add Todo
    // * on ajoute la valeur "Learn Test With Cypress" à l'input .addTodoInput
    // * on Click sur le bouton Add et on vérifie que la todo c'est ajouté
    cy.get('.addTodoInput').type('Learn Test With Cypress')
    cy.get('.btn').contains('Add').click()
    cy.get('ul li').last().contains('span', 'Learn Test With Cypress')
    
    // * Add Todo Sans Valeur
    // * Comme l'étape précédentes mais sans donner de valeur à l'input addTodo
    cy.get('.addTodoInput')
    cy.get('.btn').contains('Add').click()
    cy.get('ul li').should('have.length', 4)

    // * Done Todo
    // * On click sur le boutton 'A faire' de la todo précédement ajouter 
    // * on vérifie qu'elle done la valeur doit posséde maintenant en plus '✔️' 
    // * on Click sur le boutton 'Réaliser' qui remplace le boutton 'A faire'
    // * on vérifie que la valeur n'est plus done et donc ne posséde plus '✔️' 
    cy.get('ul li div').last().contains('.btn', 'A faire').click()
    cy.get('ul li').last().contains('span', 'Learn Test With Cypress ✔️')
    cy.get('ul li div').last().contains('.btn', 'Réalisé').click()
    cy.get('ul li').last().contains('span', 'Learn Test With Cypress')

    // * Edit Todo with enter
    // * On Click sur le boutton 'Modifier' de la todo précédement ajouter
    // * Dans l'input qui vient de s'afficher on séléctionne tout le texte
    // * et on entre notre nouvelle valeur qui remplaceras celle précédente
    // * on appuie sur la touche entré et on vérifie que la valeur à bien changé
    cy.get('ul li div').last().contains('.btn', 'Modifier').click()
    cy.get('.editTodo input').last().type('{selectAll}Learn Test End to End{enter}')
    cy.get('ul li').last().contains('span', 'Learn Test End to End')

    // * Edit Todo with button save
    // * même chose que l'étape précédente mais on utilisé pas la touche entré
    // * on click sur le boutton 'Save' à la place
    cy.get('ul li div').last().contains('.btn', 'Modifier').click()
    cy.get('.editTodo input').last().type('{selectAll}Learn Test With Cypress')
    cy.get('.editTodo').last().contains('.btn', 'Save').click()
    cy.get('ul li').last().contains('span', 'Learn Test With Cypress')


    // * Edit Todo cancel button
    // * Même chose que l'étape précédente sauf que l'on click sur le bouton 'cancel'
    // * Et on vérifie que la valeur de la todo n'a pas changé
    cy.get('ul li div').last().contains('.btn', 'Modifier').click()
    cy.get('.editTodo input').last().type('{selectAll}Learn wordpress')
    cy.get('.editTodo').last().contains('.btn', 'Cancel').click()
    cy.get('ul li').last().contains('span', 'Learn Test With Cypress')

    // * Delete Todo
    // * On Supprime la todo créer au début du test en clickant sur le boutton 'supprimer'
    // * et on vérifie que la liste n'as plus que 3 todo  
    cy.get('ul li div').last().contains('.btn', 'Supprimer').click()
    cy.get('ul li').should('have.length', 3)
  })

  it('test addtodo with enter', () => {
    cy.visit('http://localhost:3000/deployFrontTodo')

    // * Add Todo
    // * on ajoute la valeur "Learn Test With Cypress" à l'input .addTodoInput
    // * on appuie sur la touche enter et on vérifie que la todo c'est ajouté
    cy.get('.addTodoInput').type('Learn Test With Cypress{enter}')
    cy.get('ul li').last().contains('span', 'Learn Test With Cypress')

    // * Delete Todo
    // * On Supprime la todo créer au début du test en clickant sur le boutton 'supprimer'
    cy.get('ul li div').last().contains('.btn', 'Supprimer').click()
    cy.get('ul li').should('have.length', 3)

  });
})