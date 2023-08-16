export class TableParamModel {
    tableName: string;
    parameterName: string;
    parameterValue: string;
    refType: string;
    constructor(tableName: string, parameterName: string, parameterValue: string, refType?: string) {
        this.tableName = tableName;
        this.parameterName = parameterName;
        this.parameterValue = parameterValue;
        this.refType = null == refType ? 'LINK' : refType;
    }
}
