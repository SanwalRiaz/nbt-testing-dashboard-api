describe('NBT API Testing - GET', () => {
  it('Tests - GET', () => {
    cy.request('/').as('request');
    cy.get('@request').then((todos) => {
      expect(todos.status).to.eq(200);
      assert.equal(todos.body, 'NBT Testing API');
    });
  });
});
