import { Events, Members } from '../interfaces';

export default class Data {
  url: string;
  
  static instance: Data;

  constructor(url: string) {
    this.url = url;

    if (!Data.instance) {
      Data.instance = this;
    }
    return Data.instance;
  }

  async sendData(endPoint: string, data: Events[] | Members[]): Promise<Response> {
    /* eslint quotes: 0 */
    /* eslint no-useless-escape: 0 */
    const newData = JSON.stringify({ data: JSON.stringify(data), id: "string" }).replace(/"/g, '\"');

    const response = await fetch(`${this.url}${endPoint}`, {
      method: 'POST',
      body: newData,
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
    })
      .catch((err) => {
        throw new Error(`Could not fetch, message: ${err.message}`);
      });

    return response;
  }

  async getData(endPoint: string): Promise<Response> {
    const response = await fetch(`${this.url}${endPoint}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${this.url}, status: ${response.status}`);
    }

    return response;
  }

  async deleteData(endPoint: string, id: string): Promise<Response> {
    const response = await fetch(`${this.url}${endPoint}/${id}`, {
      method: 'DELETE',
    })
      .catch((err) => {
        throw new Error(`Could not fetch, message: ${err.message}`);
      });

    return response;
  }

  async putData(endPoint: string, data: Events[] | Members[], id: string): Promise<Response> {
    const newData = JSON.stringify({ data: JSON.stringify(data), id }).replace(/"/g, '\"');

    const response = await fetch(`${this.url}${endPoint}/${id}`, {
      method: 'PUT',
      body: newData,
      headers: {
        'Content-type': 'application/json; charset=utf-8',
      },
    })
      .catch((err) => {
        throw new Error(`Could not fetch, message: ${err.message}`);
      });

    return response;
  }
}
