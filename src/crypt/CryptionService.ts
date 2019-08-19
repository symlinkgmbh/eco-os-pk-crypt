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



import bcrypt from "bcrypt";

export class CryptionService {

    private saltRounds: number;

    public constructor(saltRounds: number) {
        this.saltRounds = saltRounds;
    }

    public async hash(chars: string): Promise<string> {
        return await bcrypt.hash(chars, this.saltRounds);
    }

    public async compare(nativeChar: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(nativeChar, hash);
    }
}
