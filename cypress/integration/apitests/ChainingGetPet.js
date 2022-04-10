/// <reference types = "Cypress" />

describe('post and get api for new pet', () => {

    it('add new pet', () => {

        cy.fixture('createPet').then((payload) => {
            cy.request({
                method: 'POST',
                url: 'https://petstore.swagger.io/v2/pet',
                header: {
                    "accept": "application/json",
                    "Content-Type": "application/json"
                }, body: {
                    "id": payload.id,
                    "category": {
                        "id": payload.category.id,
                        "name": payload.category.name
                    },
                    "name": payload.name,
                    "photoUrls": payload.photoUrls,
                    "tags": [
                        {
                            "id": payload.tags[0].id,
                            "name": payload.tags[0].name
                        }
                    ],
                    "status": payload.status
                }
            }).then((res) => {
                cy.log(JSON.stringify(res))
                expect(res.status).equal(200);
                expect(res.body.id).to.eq(payload.id)
                expect(res.body.category).has.property('id', payload.category.id)
                expect(res.body.category).has.property('name', payload.category.name)
                expect(res.body).has.property('name', payload.name)
                expect(res.body.photoUrls).to.be.an('array')
                expect(res.body).has.property('status', payload.status)
                expect(res.body.status).to.be.a('string')
                expect(res.body.id).to.be.a('number')
            }).then((res) => {
                const petId = res.body.id;
                cy.log("pet Id is: " + petId)

                //2. GET PET
                cy.request({
                    method: "GET",
                    url: "https://petstore.swagger.io/v2/pet/" + petId,
                    header: {
                        "accept": "application/json"
                    }
                }).then((res) => {
                    expect(res.status).to.eq(200)
                    expect(res.body.id).to.eq(petId)
                    expect(res.body.category).has.property('id', payload.category.id)
                    expect(res.body.category).has.property('name', payload.category.name)
                    expect(res.body).has.property('name', payload.name)
                    expect(res.body.photoUrls).to.be.an('array')
                    expect(res.body).has.property('status', payload.status)
                })
            })
        })
    })
})