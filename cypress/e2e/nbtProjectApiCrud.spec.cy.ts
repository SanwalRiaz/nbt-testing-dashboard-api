describe('NBT Project API Testing', () => {
  it('Project API - GET', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request(`company/${companyID}/project`)
        .as('request')
        .its('headers')
        .its('content-type')
        .should('include', 'application/json');
      cy.get('@request').then((todos) => {
        expect(todos.status).to.eq(200);
      });
    });
  });

  it('Project API - POST', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('POST', `company/${companyID}/project`, {
        name: 'Project Testing API',
        project_description: 'Project API Testing 123',
        start_date: '12/12/2020',
        end_date: '12/12/2022',
      }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body)
          .to.have.property('result')
          .to.have.property('name')
          .to.eq('Project Testing API');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('project_description')
          .to.eq('Project API Testing 123');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('start_date')
          .to.eq('12/12/2020');
        expect(response.body)
          .to.have.property('result')
          .to.have.property('end_date')
          .to.eq('12/12/2022');
      });
    });
  });

  it('Project API ID - GET', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      const projectID = `${Math.floor(Math.random() * 100)}`;
      cy.request(`company/${companyID}/project/${projectID}`).then(
        (response) => {
          expect(response.status).to.eq(200);
        }
      );
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
      cy.request('POST', `company/${companyID}/project`, {
        name: 'Project Testing API',
        project_description: 'Project API Testing 123',
        start_date: '12/12/2020',
        end_date: '12/12/2022',
      }).then((response, projectID) => {
        expect(response.status).to.eq(201);
        projectID = response.body.result.id;
        cy.request('PUT', `company/${companyID}/project/${projectID}`, {
          name: 'Project Testing API Edit',
          project_description: 'Project API Testing 123 Edit',
          start_date: '12/12/2020',
          end_date: '12/12/2022',
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body)
            .to.have.property('result')
            .to.have.property('name')
            .to.eq('Project Testing API Edit');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('project_description')
            .to.eq('Project API Testing 123 Edit');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('start_date')
            .to.eq('12/12/2020');
          expect(response.body)
            .to.have.property('result')
            .to.have.property('end_date')
            .to.eq('12/12/2022');
        });
      });
    });
  });
  it('Project API ID - DELETE', () => {
    cy.request('POST', '/company', {
      name: 'Testing API Company',
      company_address: 'Address Testing Api Company',
      company_phone: '1111111111',
      company_email: 'testingcompany@gmail.com',
      company_website: 'www.testingapicrud.com',
    }).then((response, companyID) => {
      expect(response.status).to.eq(201);
      companyID = response.body.result.id;
      cy.request('POST', `company/${companyID}/project`, {
        name: 'Project Testing API',
        project_description: 'Project API Testing 123',
        start_date: '12/12/2020',
        end_date: '12/12/2022',
      }).then((response, projectID) => {
        expect(response.status).to.eq(201);
        projectID = response.body.result.id;
        cy.request('DELETE', `company/${companyID}/project/${projectID}`).then(
          (response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('result').to.eq('true');
          }
        );
      });
    });
  });
});
