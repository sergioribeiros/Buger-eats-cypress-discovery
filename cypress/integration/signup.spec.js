import signup from '../pages/SingupPage'
import signupFactory from '../factories/signupFactory'



describe('Signup', () => {

    // before(function() {
    //     cy.log('Tudo aqui é executada uma única vez ANTES de todos os casos de teste')
    // })

    // beforeEach(function() {
    //     cy.log('Tudo aqui é executado uma única vez ANTES de CADA casos de testes')
    // })

    // beforeEach(function () {
    //     cy.fixture('delivery').then((d) => {
    //         this.delivery = d
    //     })
    // })

    // after(function() {
    //     cy.log('Tudo aqui é executada uma única vez DEPOIS de todos os casos de teste')
    // })

    it('User should be deliver', function () {

        var delivery = signupFactory.deliver()

        //Creating deliver
        signup.go()
        signup.fillForm(delivery)
        signup.submit()

        //verify confirm message
        const expectedMessage = "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato."

        signup.modalContentShouldBe(expectedMessage)
    })

    it('Invalid document', function () {

        var delivery = signupFactory.deliver()
        delivery.cpf = '000000141AA'

        //Creating deliver
        signup.go()
        signup.fillForm(delivery)
        signup.submit()
        signup.alertMessage('Oops! CPF inválido')
    })
    it('Invalid mail', function () {

        var delivery = signupFactory.deliver()

        delivery.email = 'user.com.br'

        //Creating deliver
        signup.go()
        signup.fillForm(delivery)
        signup.submit()
        signup.alertMessage('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {

        const messages = [
            {
                field: 'name', output: 'É necessário informar o nome'
            },
            {
                field: 'cpf', output: 'É necessário informar o CPF'
            }, {
                field: 'mail', output: 'É necessário informar o email'
            }, {
                field: 'postalcode', output: 'É necessário informar o CEP'
            }, {
                field: 'number', output: 'É necessário informar o número do endereço'
            }, {
                field: 'delivery_method', output: 'Selecione o método de entrega'
            }, { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]
        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessage(msg.output)
            })
        })
    })
})