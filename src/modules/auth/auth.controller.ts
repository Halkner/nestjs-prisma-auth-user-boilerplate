import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '@common/constants/jwt';
import { SignInDTO } from './dtos/sign-in.dto';
import {
  ApiAuthControllerDocs,
  ApiSignInDocs,
  ApiSignUpDocs,
} from './docs/auth.docs';
import { SignUpDTO } from './dtos/sign-up.dto';
@Controller('auth')
@ApiAuthControllerDocs()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiSignInDocs()
  async signIn(@Body() signInDto: SignInDTO) {
    return await this.authService.signIn(signInDto);
  }
  @Public()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('signup')
  @ApiSignUpDocs()
  signUp(@Body() signUpDto: SignUpDTO) {
    return this.authService.signUp(signUpDto);
  }
}
