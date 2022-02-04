var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver: function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: '41999999999',
            address: {
                postal_code: '93010160',
                street: 'Rua Flores da Cunha',
                number: '75',
                district: 'Centro',
                city_state: 'São Leopoldo/RS'
                },
            delivery_method: 'Moto',
            cnh: 'cnh-digital.jpg'
        }

        return data
    }
}