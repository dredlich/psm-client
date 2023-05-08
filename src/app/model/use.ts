export interface IUse {
  identifier: string;
  productNr: string;
  authorizationRequestNr: string;
  useNr: string;
  einsatzgebiet: string;
  anwendungsbereich: string;
  anwendungstechnik: string;
  wirkungsbereich: string;
}
export class Use implements IUse {
  identifier: string;
  productNr: string;
  authorizationRequestNr: string;
  useNr: string;
  einsatzgebiet: string;
  anwendungsbereich: string;
  anwendungstechnik: string;
  wirkungsbereich: string;
  // kultur_erl: string;
  // schadorg_erl: string;

  constructor(
    awgId,
    kennr,
    antragnr,
    awgnr,
    einsatzgebiet,
    anwendungsbereich,
    anwendungstechnik,
    wirkungsbereich
  ) {
    this.identifier = awgId;
    this.productNr = kennr;
    this.authorizationRequestNr = antragnr;
    this.useNr = awgnr;
    this.einsatzgebiet = einsatzgebiet;
    this.anwendungsbereich = anwendungsbereich;
    this.anwendungstechnik = anwendungstechnik;
    this.wirkungsbereich = wirkungsbereich;
  }
}
