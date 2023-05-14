export interface IDictionary {
  add(key: number, value: any): void;
  remove(key: number): void;
  containsKey(key: number): boolean;
  getKeys(): any[];
  getValues(): any[];
}

export class Dictionary implements IDictionary {

  keys: number[] = [];
  values: any[] = [];

  constructor(init: { key: number; value: any; }[]) {
    for (const item of init) {
      this[item.key] = item.value;
      this.keys.push(item.key);
      this.values.push(item.value);
    }
  }

  add(key: number, value: any): void {
    this[key] = value;
    this.keys.push(key);
    this.values.push(value);
  }

  remove(key: number): void {
    const index = this.keys.indexOf(key, 0);
    this.keys.splice(index, 1);
    this.values.splice(index, 1);

    delete this[key];
  }

  getKeys(): number[] {
    return this.keys;
  }

  getValues(): any[] {
    return this.values;
  }

  containsKey(key: number): boolean {
    return typeof this[key] !== 'undefined';
  }

  toLookup(): IDictionary {
    return this;
  }
}
