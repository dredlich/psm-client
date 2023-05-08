export class Code {
  code: string;
  codeListId: number;
  languageCode: string;
  codeValueText: string;
  disabled: string;

  constructor(code: string, codeListId: number, languageCode: string, codeValueText: string, disabled: string) {
    this.code = code;
    this.codeListId = codeListId;
    this.languageCode = languageCode;
    this.codeValueText = codeValueText;
    this.disabled = disabled;
  }
}
