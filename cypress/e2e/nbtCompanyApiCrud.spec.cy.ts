describe('NBT Company API Testing', () => {
  it('Company Listing API - GET', () => {
    cy.request('/company')
      .as('request')
      .its('headers')
      .its('content-type')
      .should('include', 'application/json');
    cy.get('@request').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Company API - POST', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response) => {
      expect(response.status).to.eq(201);
      cy.log(response.body);
      expect(response.body)
        .to.have.property('result')
        .to.have.property('name')
        .to.eq('Testing API Company');
      expect(response.body)
        .to.have.property('result')
        .to.have.property('company_address')
        .to.eq('Address Testing Api Company');
      expect(response.body)
        .to.have.property('result')
        .to.have.property('company_phone')
        .to.eq('1111111111');
      expect(response.body)
        .to.have.property('result')
        .to.have.property('company_email')
        .to.eq('testingcompany@gmail.com');
      expect(response.body)
        .to.have.property('result')
        .to.have.property('company_website')
        .to.eq('www.testingapicrud.com');
    });
  });

  it('Company API - GET', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request(`/company/${companyID}`)
        .as('request')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json');
      cy.get('@request').then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('Company API - PUT', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('PUT', `/company/${companyID}`, {
        name: 'Testing API Company',
        company_address: 'Address Testing Api Company',
        company_phone: '1111111111',
        company_email: 'testingcompany@gmail.com',
        company_website: 'www.testingapicrud.com',
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body)
          .to.have.property('result')
          .to.have.property('name')
          .to.eq('Testing API Company');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('company_address')
          .to.eq('Address Testing Api Company');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('company_phone')
          .to.eq('1111111111');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('company_email')
          .to.eq('testingcompany@gmail.com');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('company_website')
          .to.eq('www.testingapicrud.com');
        cy.request({
          method: 'GET',
          url: `/company/${companyID + 1}`,
          failOnStatusCode: false,
        }).as('nextCompany');
        cy.get('@nextCompany').its('status').should('equal', 404);
      });
    });
  });
  it('Company API - DELETE', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('DELETE', `/company/${companyID}`).then((response) => {
        expect(response.status).to.eq(204);
        expect(response.body).to.have.property('result').to.eq('true');
      });
    });
  });
});
