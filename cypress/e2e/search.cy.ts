describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('searches for GitHub repos and redirect to detail page', () => {
    cy.get('h1').should('contain', 'GitHub Repos Explorer')
    cy.get('input[placeholder="Search for a Github User..."]').type(
      'vercel{enter}'
    )
    cy.contains('div.flex.flex-wrap.justify-center a', 'actions').click()
    cy.url().should('include', '/vercel/actions')
  })

  it('displays error for non-existent user', () => {
    const nonExistentUser = 'this-user-does-not-exist-12345'

    cy.get('input[placeholder="Search for a Github User..."]').type(
      `${nonExistentUser}{enter}`
    )

    cy.contains('Loading...').should('exist')
    cy.contains(
      'Resource not found. Please check the GitHub informations and try again.',
      { timeout: 10000 }
    ).should('be.visible')
  })

  it('displays message for user with no public repos', () => {
    const userWithNoRepos = 'maelis123'

    cy.get('input').type(`${userWithNoRepos}{enter}`)
    cy.contains('This user has no public repos.', { timeout: 10000 }).should(
      'be.visible'
    )
  })

  it('handles server error', () => {
    cy.intercept('GET', 'https://api.github.com/users/*/repos', {
      statusCode: 500,
      body: { message: 'Internal Server Error' },
    }).as('serverError')

    cy.get('input[placeholder="Search for a Github User..."]').type(
      'vercel{enter}'
    )

    cy.wait('@serverError')

    cy.contains('GitHub server error. Please try again later.', {
      timeout: 10000,
    }).should('be.visible')
  })
})

describe('Repository Detail Page', () => {
  const testUser = 'vercel'
  const testRepo = 'actions'

  beforeEach(() => {
    cy.visit(`/${testUser}/${testRepo}`)
  })

  it('displays all repository information', () => {
    cy.get('h2').should('contain', testRepo)
    cy.get('p').should('contain', 'GitHub Actions for interacting with Docker')
    cy.contains('span', 'Starred by 15 devs').should('exist')
    cy.contains('span', '8 forks').should('exist')
    cy.contains('span', '1 follower').should('exist')
    cy.contains('span', 'Created on 20/06/2019').should('exist')
    cy.contains('span', 'Updated on 11/12/2024').should('exist')
    cy.contains('span', 'Ruby').should('exist')

    cy.get('a[href*="github.com"]')
      .should('contain', 'View on GitHub')
      .and('have.attr', 'target', '_blank')
  })

  it('has a working back link', () => {
    cy.get('a').contains('Back').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })

  it('handles server error', () => {
    const invalidUser = 'invalid-user'
    const invalidRepo = 'invalid-repo'
    cy.intercept(
      'GET',
      `https://api.github.com/repos/${invalidUser}/${invalidRepo}`,
      {
        statusCode: 500,
        body: { message: 'Internal Server Error' },
      }
    )

    cy.visit(`/${invalidUser}/${invalidRepo}`, { failOnStatusCode: false })

    cy.contains(
      'Resource not found. Please check the GitHub informations and try again.',
      {
        timeout: 10000,
      }
    ).should('be.visible')

    cy.get('a').contains('Back to Search Page').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
