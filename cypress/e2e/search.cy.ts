describe('Search Page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should search for GitHub repos and redirect to detail page', () => {
    cy.get('h1').should('contain', 'GitHub Repos Explorer')
    cy.get('input[placeholder="Search for a Github User..."]').type(
      'vercel{enter}'
    )
    cy.contains('div.flex.flex-wrap.justify-center a', 'actions').click()
    cy.url().should('include', '/vercel/actions')
  })

  it('should display error for non-existent user', () => {
    const nonExistentUser = 'this-user-does-not-exist-12345'

    cy.get('input[placeholder="Search for a Github User..."]').type(
      `${nonExistentUser}{enter}`
    )

    cy.contains('Loading...').should('exist')
    cy.contains(
      'User not found. Please check the GitHub username and try again.',
      { timeout: 10000 }
    ).should('be.visible')
  })

  it('should display message for user with no public repos', () => {
    const userWithNoRepos = 'maelis123'

    cy.get('input').type(`${userWithNoRepos}{enter}`)
    cy.contains('This user has no public repos.', { timeout: 10000 }).should(
      'be.visible'
    )
  })
})

describe('Repository Detail Page', () => {
  const testUser = 'vercel'
  const testRepo = 'actions'

  beforeEach(() => {
    cy.visit(`/${testUser}/${testRepo}`)
  })

  it('should display all repository information', () => {
    cy.get('h2').should('contain', testRepo)
    cy.get('p').should('contain', 'GitHub Actions for interacting with Docker')
    cy.get('p').should('contain', 'Starred by 15 people')
    cy.get('p').should('contain', 'Forked by 8 people')
    cy.get('p').should('contain', 'Created on 20/06/2019')
    cy.get('p').should('contain', 'Updated on 11/12/2024')
    cy.get('p').should('contain', 'Ruby')

    cy.get('a[href*="github.com"]')
      .should('contain', 'View on GitHub')
      .and('have.attr', 'target', '_blank')
  })

  it('should have a working back link', () => {
    cy.get('a').contains('Back').click()
    cy.url().should('eq', Cypress.config().baseUrl + '/')
  })
})
