export interface RequestCommand {
  guid?: string;
  browserSessionGuid?: string;
  sessionGuid?: string;

  text?: string;
  query?: string;
  id?: string;
  data?: any;
  commandType?: string;
}
