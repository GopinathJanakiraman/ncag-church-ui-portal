import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
declare var require: any;

const SecureStorage = require('secure-web-storage');
const SECRET_KEY = 'secret_key';
@Injectable()
export class NcagService {
  logout: any;

  constructor(private http: HttpClient) {}

  public commonPOSTCall(url: string, data: any): any {
    return this.http.post(url, data);
  }
  public commonPUTCall(url: string, data: any): any {
    return this.http.put(url, data);
  }
  public commonGETCall(url: string): any {
    return this.http.get(url);
  }

  public secureStorage = new SecureStorage(localStorage, {
    hash: function hash(key: any) {
      key = CryptoJS.SHA256(key, { SECRET_KEY });

      return key.toString();
    },
    // Encrypt the localstorage data
    encrypt: function encrypt(data: any) {
      data = CryptoJS.AES.encrypt(data, SECRET_KEY);
      data = data.toString();
      return data;
    },
    // Decrypt the encrypted data
    decrypt: function decrypt(data: any) {
      data = CryptoJS.AES.decrypt(data, SECRET_KEY);
      data = data.toString(CryptoJS.enc.Utf8);
      return data;
    },
  });
}
