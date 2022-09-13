import { Injectable } from '@angular/core';
import { Preferences  } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  set = async (key: any, value: any) => {
    await Preferences .set({ key, value: JSON.stringify(value) });
  };

  get = async (key: any) => {
    const { value } = await Preferences .get({ key });
    return JSON.parse(value as string);
  };

  remove = async (key: any) => {
    await Preferences .remove({ key });
  };
}
