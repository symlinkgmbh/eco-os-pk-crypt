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



import * as forge from "node-forge";

class RSAGenerator {
  private publicKey: forge.pki.rsa.PublicKey;
  private privateKey: forge.pki.rsa.PrivateKey;

  constructor() {
    const keys = forge.pki.rsa.generateKeyPair(4096);
    this.publicKey = keys.publicKey;
    this.privateKey = keys.privateKey;
  }

  public getPublicKey(): forge.pki.rsa.PublicKey {
    return this.publicKey;
  }

  public getPrivateKey(): forge.pki.rsa.PrivateKey {
    return this.privateKey;
  }

  public getPublicKeyPem(): string {
    return forge.pki.publicKeyToPem(this.publicKey);
  }

  public getPrivateKeyPem(): string {
    return forge.pki.privateKeyToPem(this.privateKey);
  }

  public getPrivateKeyFromPem(pem: string): forge.pki.PrivateKey {
    return forge.pki.privateKeyFromPem(pem);
  }

  public decryptData(data: string): any {
    return this.privateKey.decrypt(data, "RSA-OAEP", {
      md: forge.md.sha512.create(),
    });
  }

  public fromBase64(data: string): string {
    return forge.util.decode64(data);
  }
}

export { RSAGenerator };
