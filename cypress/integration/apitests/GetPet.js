/// <reference types = "Cypress" />
const dataJson = 

describe('get api pet by status', () => {

    it('get pet by status', () => {
        const petId = 9223372000001124000;
        cy.request({
            method: "GET",
            url: "https://petstore.swagger.io/v2/pet/" + petId,
            header: {
                "accept": "application/json"
            }
        }).then((res) => {
            expect(res.status).to.eq(200)
            expect(res.body.id).to.eq(petId)
            expect(res.body.photoUrls).to.be.an('array')
        })
    })
})