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




class PasswordGenerator {
  public static generatePassword(): string {
    return `${this.getRandomAlphabeticChar()}${this.getRandomAlphabeticChar()}${this.getRandomAlphabeticChar(
      true,
    )}${this.getRandomAlphabeticChar(
      true,
    )}${this.getSpecialChars()}${this.getSpecialChars()}${this.getRandomNumberChar()}${this.getRandomNumberChar()}${this.getRandomAlphabeticChar()}`;
  }

  private static alphabeticChars: Array<string> = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
  ];
  private static numericalChars: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  private static specialChars: Array<string> = ["!", "§", "$", "%", "&", "/", "(", ")", "@", "?", "€"];

  private static getRandomAlphabeticChar(upperCase?: boolean): string {
    if (upperCase) {
      return this.alphabeticChars[Math.floor(Math.random() * this.alphabeticChars.length)].toUpperCase();
    }

    return this.alphabeticChars[Math.floor(Math.random() * this.alphabeticChars.length)];
  }

  private static getRandomNumberChar(): string {
    return this.numericalChars[Math.floor(Math.random() * this.numericalChars.length)];
  }

  private static getSpecialChars(): string {
    return this.specialChars[Math.floor(Math.random() * this.specialChars.length)];
  }
}

export { PasswordGenerator };
