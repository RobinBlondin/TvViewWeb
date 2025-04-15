export class HighwayBridgeModel {
    Alias: string;
    Result: string;
    StartTime: string;
    EndTime: string;
    MsgId: string;

    constructor(Alias: string, Result: string, StartTime: string, EndTime: string, MsgId: string) {
        this.Alias = Alias;
        this.Result = Result;
        this.StartTime = StartTime;
        this.EndTime = EndTime;
        this.MsgId = MsgId;
    }
}