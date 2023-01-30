describe('should order works successfylly', () => {
    const email = 'dimualdos@gmail.com';
    const password = 'Pipec1234';
    beforeEach(() => {
        cy.visit('/');
    })
    const closeModal = '[data-testid="close-modal"]';
    const constructorItem = '[data-testid="constructor-item"]'
    it('should open the modal', () => {
        cy.contains('Соберите бургер');
        cy.get('[data-testid="link-ingredient"]').first().click();
        cy.get(closeModal).click();
    })

    it('should drag & drop an ingredients', () => {
        cy.visit('/');
        cy.get('[alt="Краторная булка N-200i"]')
            .trigger('dragstart');
        cy.get('[data-testid="constructor"]')
            .trigger('drop');

        cy.get('[alt="Соус с шипами Антарианского плоскоходца"]')
            .trigger('dragstart');
        cy.get(constructorItem)
            .trigger('drop');

        cy.get('[alt="Говяжий метеорит (отбивная)"]')
            .trigger('dragstart');
        cy.get(constructorItem)
            .trigger('drop');
        cy.get('[alt="Сыр с астероидной плесенью"]')
            .trigger('dragstart');
        cy.get(constructorItem)
            .trigger('drop');

        cy.get(constructorItem)
            .eq(0)
            .find('svg')
            .eq(2)
            .click();
        cy.get('[alt="Соус с шипами Антарианского плоскоходца"]')
            .should('have.length', 1);

        cy.get('button').contains('Оформить заказ').click();
        cy.get('[data-testid="email"]').type(`${email}`);
        cy.get('[data-testid="password"]').type(`${password}`);
        cy.get("button").contains("Войти").click();
        cy.get('button').contains('Оформить заказ').click();

        cy.get('[data-testid="order-details-container"]', { timeout: 17000 })

        cy.get(closeModal)
            .click()
        cy.get(closeModal)
            .should('not.exist')
    });
});
