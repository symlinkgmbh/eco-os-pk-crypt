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



import { PkCrypt } from "@symlinkde/eco-os-pk-models";
import { Worker } from "worker_threads";

export class CryptoWorker implements PkCrypt.ICryptoWorker {
  public async encryptBody<T>(obj: T, publickey: any): Promise<T> {
    return new Promise((resolve) => {
      try {
        const encryptionWworker = new Worker("./src/crypto/EncryptBodyWorker.js", {
          workerData: {
            publickey,
            content: obj,
          },
        });
        encryptionWworker.on("message", (result) => {
          resolve(result);
        });

        encryptionWworker.on("error", (err) => {
          throw new Error(err.message);
        });
      } catch (err) {
        throw new Error(err);
      }
    });
  }
  public async decryptBody<T>(obj: T, privatekey: any): Promise<T> {
    return new Promise((resolve) => {
      try {
        const decryptionWorker = new Worker("./src/crypto/DecryptBodyWorker.js", {
          workerData: {
            privatekey,
            content: obj,
          },
        });
        decryptionWorker.on("message", (result) => {
          resolve(result);
        });

        decryptionWorker.on("error", (err) => {
          throw new Error(err.message);
        });
      } catch (err) {
        throw new Error(err);
      }
    });
  }
}
