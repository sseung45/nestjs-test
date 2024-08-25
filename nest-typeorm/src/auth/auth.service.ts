import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';


@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService
  ) {}

  async registerUser(newUser: UserDTO): Promise<UserDTO> {
    let userFind: UserDTO = await this.UserService.findByFields({
      where: { username: newUser.username }
    });
    if (userFind) {
      throw new HttpException('Username already used!', HttpStatus.BAD_REQUEST);
    }
    return await this.UserService.save(newUser);
  }

  async validateUser(userDTO: UserDTO): Promise<UserDTO | undefined> {
    let userFind: UserDTO = await this.UserService.findByFields({
      where: { username: userDTO.username }
    })
    if(!userFind || userDTO.password !== userFind.password) {
      throw new UnauthorizedException();
    }
    return userFind
  }
}
