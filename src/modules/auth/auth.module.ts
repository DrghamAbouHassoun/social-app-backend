import { Module } from "@nestjs/common";
import { UserModule } from "../users/user.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import globalConstants from "src/config/constants";
import { StaticFilesModule } from "../staticfiles/staticfile.module";

@Module({
    imports: [
        UserModule,
        StaticFilesModule,
        JwtModule.register({
            global: true,
            secret: globalConstants.jwtSecret,
            signOptions: { expiresIn: "3600s" },
        })
    ],
    controllers: [AuthController],
    providers: [AuthService],
    exports: [],
})
export class AuthModule {}