/**
 * Copyright 2018-2020 Symlink GmbH
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




import { StaticShaService, RSAGenerator } from "..";

export class CryptionUtils {
  public static validateRequestChecksum(checksum: string, object: object): boolean {
    if (checksum !== Buffer.from(StaticShaService.getSha3(JSON.stringify(object).toString())).toString("base64")) {
      return false;
    }

    return true;
  }

  public static buildChecksumFromBody(object: object): string {
    return Buffer.from(StaticShaService.getSha3(JSON.stringify(object).toString())).toString("base64");
  }

  public static generateApiKey(): string {
    const rsa = new RSAGenerator();
    return StaticShaService.getSha3(rsa.getPublicKeyPem()).toUpperCase();
  }
}
