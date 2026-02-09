import { MailerService } from '@nestjs-modules/mailer';
import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import Codes from 'src/entities/codes.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly mailService: MailerService,
    @InjectRepository(Codes)
    private codeRepo: Repository<Codes>,
  ) {}
  async register(registerDto: RegisterDto) {
    // const user = await this.userService.findUserByEmail(registerDto.email);
    // if (user) {
    //   throw new HttpException('User already exist', 400);
    // }
    // registerDto.password = await bcrypt.hash(registerDto.password, 10);
    // const savedUser = await this.userService.addUser(registerDto);
    // return instanceToPlain(savedUser);
    setImmediate(async () => {
      await this.mailService.sendMail({
        text: 'salam',
        subject: 'welcome',
        to: registerDto.email,
        template: 'welcome.html',
        context: {
          name: registerDto.first_name,
          family: registerDto.last_name,
        },
        attachments: [
          {
            filename: 'file.png',
            path: './src/assets/file.png',
            cid: 'logo',
          },
        ],
      });
    });
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.findUserByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    if (loginDto.code) {
      const checkCode = await this.codeRepo.findOne({
        where: {
          code: loginDto.code,
          email: loginDto.email,
          is_used: false,
        },
      });

      if (checkCode) {
        checkCode.is_used = true;
        await this.codeRepo.save(checkCode);

        const accessToken = this.jwtService.sign({
          sub: user.id,
          email: user.email,
        });

        return {
          accessToken,
        };
      } else {
        throw new HttpException('code is not valid', 400);
      }
    } else {
      const code = await this.generateOtpCode();
      await this.codeRepo.save({
        code: code,
        email: loginDto.email,
      });
      return { code };
    }
  }

  async generateOtpCode() {
    return this.getRandomCode();
  }
  getRandomCode() {
    const min = 10000;
    const max = 99999;
    const otp = Math.floor(Math.random() * (max - min + 1)) + min;
    return otp;
  }
}
