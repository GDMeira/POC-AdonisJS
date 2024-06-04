// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
  public async index({ response }) {
    console.log('aqui')
    return response.send('ok yuri')
  }

  /**
   * Create/save a new auth.
   * POST auth
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  public async signup({ request, response }) {
    try {
      const { username, password, email } = request.all()

      return await User.create({
        username,
        email,
        password
      })
    } catch (error) {
      console.log(error)
      response.send('Credentials missing')
    }
  }

  //   /**
  //  * Do login.
  //  * POST auth/login
  //  *
  //  * @param {object} ctx
  //  * @param {Request} ctx.request
  //  * @param {Response} ctx.response
  //  */
  //   public async login({ request, response, auth }) {
  //     const { user, password } : { user: string , password: string } = request.post();

  //     const token: any = await auth.authenticator('jwt').attempt(user, password);

  //     if (token) {
  //       return response.send(token);
  //     } else {
  //       throw new HttpException('Credenciais inválidas', 400);
  //     }
  //   }
}
