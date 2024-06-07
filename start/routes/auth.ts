import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.post('/signup', 'AuthController.signup')
  Route.post('/signin', 'AuthController.signin')
})
