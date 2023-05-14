import {Column} from './table/column';

export interface IUse {
  identifier: string;
  productNr: string;
  authorizationRequestNr: string;
  useNr: string;
  authorizationState: string;
  authorizationEnd: string;
  fieldOfUse: string;
  applicationArea: string;
  areaOfUse: string;
  applicationTechnique: string;
}
export class Use implements IUse
{
  @Column()
  identifier: string;
  productNr: string;
  authorizationRequestNr: string;
  useNr: string;
  authorizationState: string;
  @Column()
  authorizationEnd: string;
  @Column()
  fieldOfUse: string;
  @Column()
  applicationArea: string;
  @Column()
  areaOfUse: string;
  @Column()
  applicationTechnique: string;


  constructor(
    awgId,
    kennr,
    antragnr,
    awgnr,
    wirkungsbereich,
    einsatzgebiet,
    anwendungsbereich,
    anwendungstechnik
  ) {
    this.identifier = awgId;
    this.productNr = kennr;
    this.authorizationRequestNr = antragnr;
    this.useNr = awgnr;
    this.fieldOfUse = wirkungsbereich;
    this.applicationArea = einsatzgebiet;
    this.areaOfUse = anwendungsbereich;
    this.applicationTechnique = anwendungstechnik;

  }
}
