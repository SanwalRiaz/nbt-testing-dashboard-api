describe('NBT User API Testing', () => {
  it('User API - GET', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request(`company/${companyID}/user`)
        .as('request')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json');
    });
    cy.get('@request').then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('User API - POST', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('POST', `company/${companyID}/user`, {
        username: 'Username API',
        name: 'API TEST USER',
        address: 'Germany GmbH',
        mail: 'testingAPI@gmail.com',
        birthdate: '10/10/2010',
        title: 'Mr.',
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body)
          .to.have.property('result')
          .to.have.property('username')
          .to.eq('Username API');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('name')
          .to.eq('API TEST USER');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('address')
          .to.eq('Germany GmbH');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('mail')
          .to.eq('testingAPI@gmail.com');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('birthdate')
          .to.eq('10/10/2010');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('title')
          .to.eq('Mr.');
      });
    });
  });

  it('User API ID - GET', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('POST', `company/${companyID}/user`, {
        username: 'Username API',
        name: 'API TEST USER',
        address: 'Germany GmbH',
        mail: 'testingAPI@gmail.com',
        birthdate: '10/10/2010',
        title: 'Mr.',
      }).then((response, userID) => {
        userID = response.body.result.id;
        cy.request(`company/${companyID}/user/${userID}`).then((response) => {
          expect(response.status).to.eq(200);
        });
      });
    });
  });

  it('Project API ID - PUT', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('POST', `company/${companyID}/user`, {
        username: 'Username API',
        name: 'API TEST USER',
        address: 'Germany GmbH',
        mail: 'testingAPI@gmail.com',
        birthdate: '10/10/2010',
        title: 'Mr.',
      }).then((response, userID) => {
        userID = response.body.result.id;
        cy.request('PUT', `company/${companyID}/user/${userID}`, {
          username: 'Username API',
          name: 'API TEST USER',
          address: 'Germany GmbH',
          mail: 'testingAPI@gmail.com',
          birthdate: '10/10/2010',
          title: 'Mr.',
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body)
            .to.have.property('result')
            .to.have.property('username')
            .to.eq('Username API');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('name')
            .to.eq('API TEST USER');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('address')
            .to.eq('Germany GmbH');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('mail')
            .to.eq('testingAPI@gmail.com');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('birthdate')
            .to.eq('10/10/2010');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('title')
            .to.eq('Mr.');
        });
      });
    });
  });

  it('User API ID - DELETE', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('POST', `company/${companyID}/user`, {
        username: 'Username API',
        name: 'API TEST USER',
        address: 'Germany GmbH',
        mail: 'testingAPI@gmail.com',
        birthdate: '10/10/2010',
        title: 'Mr.',
      }).then((response, userID) => {
        userID = response.body.result.id;
        cy.request('DELETE', `company/${companyID}/user/${userID}`).then(
          (response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('result').to.eq('true');
          }
        );
      });
    });
  });
});
