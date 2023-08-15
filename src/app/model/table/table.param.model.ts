export class TableParamModel {
    tableName: string;
    parameterName: string;
    parameterValue: string;
    constructor(tableName: string, parameterName: string, parameterValue: string) {
        this.tableName = tableName;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
    }
}
