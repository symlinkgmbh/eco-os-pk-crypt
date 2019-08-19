/**
 * Copyright 2018-2019 Symlink GmbH
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * 
 */



import jwt from "jsonwebtoken";
import { PkCrypt } from "@symlinkde/eco-os-pk-models";

export class TokenService {
  private secret: string;
  private lifeTime: string;

  constructor(secret: string, lifeTime: string) {
    this.secret = secret;
    this.lifeTime = lifeTime;
  }

  public generateToken(obj: PkCrypt.ISignToken): string {
    return jwt.sign(obj, this.secret, { expiresIn: this.lifeTime });
  }

  public verifyToken(token: string): Promise<string | object> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, this.secret, (err, decodedToken) => {
        if (err) {
          reject(err);
        }

        resolve(decodedToken);
      });
    });
  }
}
