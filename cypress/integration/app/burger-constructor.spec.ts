

describe('should order works successfylly', () => {
    before(() => {
        cy.visit('http://localhost:3000')
        cy.contains('Соберите бургер')
    })

    it('should open the modal', () => {
        cy.get('[data-testid="link-ingredient"]').first().click();
        cy.get('[data-testid="close-modal"]').click();
    })

    it('should close the modal', () => {
        cy.get('[data-testid="close-modal"]').click();
    })


    it('should drag & drop an ingredients', () => {
        cy.get('[alt="Краторная булка N-200i (верх)"]')
            .trigger('dragstart')
        cy.get('[data-testid="constructor"]')
            .trigger('drop')
        cy.get('[alt="Соус с шипами Антарианского плоскоходца"]')
            .trigger('dragstart')
        cy.get('[data-testid="constructor-main"]')
            .trigger('drop')
        cy.get('[alt="Биокотлета из марсианской Магнолии"]')
            .trigger('dragstart')
        cy.get('[data-testid="constructor-main"]')
            .trigger('drop')
        cy.get('[alt="Соус традиционный галактический"]')
            .trigger('dragstart')
        cy.get('[data-testid="constructor-main"]')
            .trigger('drop')
    });

    it('should delete one ingredient', () => {
        cy.get('[data-testid="constructor-item"]')
            .eq(1)
            .find('svg')
            .eq(2)
            .click()
        cy.get('[alt="Соус с шипами Антарианского плоскоходца"]')
            .should('have.length', 1)
    })

    it('should order checkout successfylly', () => {
        const email = 'dimualdos@gmail.com';
        const password = 'Pipec1234'
        cy.get('button').contains('Оформить заказ').click();

        cy.get('[name=email]').type(`${email}{enter}`);
        cy.get('[name=password]').type(`${password}{enter}`);
        cy.get('[data-testid="button-login"]').click();
        cy.get('[data-testid="order-details-container"]', { timeout: 17000 })
            .contains('идентификатор заказа')
    })
    it('should close the order modal successfylly', () => {
        cy.get('[data-testid="close-modal"]')
            .click()
        cy.get('[data-testid="close-modal"]')
            .should('not.exist')
    })
})


