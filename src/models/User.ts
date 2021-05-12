import * as localStorage from '@/services/device/localStorage';
import { toInstance } from '@/services/utils/toInstance';

const USER_KEY = 'user';

export default class User {
  private _id: string;
  private _firstname: string;
  private _lastname: string;

  constructor(id: string, firstname: string, lastname: string) {
    this._id = id;
    this._firstname = firstname;
    this._lastname = lastname;
  }

  get id(): string {
    return this._id;
  }

  get firstname(): string {
    return this._firstname;
  }

  set firstname(firstname: string) {
    this._firstname = firstname;
  }

  get lastname(): string {
    return this._lastname;
  }

  set lastname(lastname: string) {
    this._lastname = lastname;
  }

  public async save(): Promise<void> {
    await localStorage.set(USER_KEY, JSON.stringify(this));
  }

  public static copy(user: User): User {
    return new User(user.id, user.firstname, user.lastname);
  }

  public static async load(): Promise<User | null> {
    const user = await localStorage.get(USER_KEY);
    const data = toInstance(new User('', '', ''), user);
    if (user) return data;
    else return null;
  }

  public static clear(): void {
    localStorage.remove(USER_KEY);
  }
}
