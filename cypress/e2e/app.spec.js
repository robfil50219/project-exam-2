describe('Holidaze App', () => {
    it('loads the home page and displays the header', () => {
      cy.visit('http://localhost:3000');
      cy.get('header').should('be.visible');
      cy.contains('Holidaze'); // Adjust based on your header content
    });
  
    it('allows searching for venues', () => {
      cy.visit('http://localhost:3000');
      // Assuming your search bar has a placeholder "Search venues..."
      cy.get('input[placeholder="Search venues..."]').type('Cozy Cottage');
      cy.get('button').contains('Search').click();
      // Verify that the results include a venue with "Cozy Cottage" in its title
      cy.contains('Cozy Cottage').should('be.visible');
    });
  });  