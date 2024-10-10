import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import {PassportStrategy} from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { ClienteRepository } from "src/repository/cliente.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(configService: ConfigService, private readonly clienteRepository: ClienteRepository){
        const settings = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.getOrThrow<string>("JWT_SECRET"),
            ignoreExpiration: false,
        }

        super(settings)
    }

    async validate(payload: {sub: number}) {
        const cliente = await this.clienteRepository.findOne({id: payload.sub})
        if(!cliente) return null;

        return cliente;
    }
}