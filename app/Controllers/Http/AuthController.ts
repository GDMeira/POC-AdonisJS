import Hash from '@ioc:Adonis/Core/Hash'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Session from 'App/Models/Session'
import User from 'App/Models/User'
import SignupValidator from 'App/Validators/Auth/SignupValidator'
import { v4 as uuidv4 } from 'uuid'

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
  public async signup({ request, response }: HttpContextContract) {
    try {
      const validatedBody = await request.validate(SignupValidator);
      const { username, password, email } = validatedBody

      return await User.create({
        username,
        email,
        password
      })
    } catch (error) {
      console.log(...error.messages.errors)
      response.status(400).send('Falha no registro.')
    }
  }

  /**
 * Do login.
 * POST auth/login
 *
 * @param {object} ctx
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
  public async signin({ request, response }) {
    const { username, password }: { username: string, password: string } = request.all();

    try {
      const userDB = await User.query()
        .where('username', username)
        .firstOrFail()
      if (!Hash.verify(userDB.password, password)) throw new Error()

      const token = uuidv4()

      await Session.create({
        token,
        user_id: userDB.id
      })

      response.send({ token })
    } catch (error) {
      console.log(error)
      response.status(400).send('Falha na autenticação.')
    }
  }
}
