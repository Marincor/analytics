export type gthis = Window & {
  fbq?: () => void;
  _fbq?: () => void;
}

export interface FacebookTrackFunction extends gthis {}

export interface FacebookQueue {
  (...args: IArguments[]): void;
  callMethod?: (...args: IArguments[]) => void;
  push?: (...args: IArguments[]) => void;
  loaded?: boolean;
  version?: string;
  queue?: IArguments[];
}

export enum FacebookTrackEvents {
  formSubmit = 'Lead',
}

export type FacebookEventParams =  {
  [FacebookTrackEvents.formSubmit]: LeadParams;
}

interface LeadParams {
  content_category?: string;
  content_name?: string;
  currency?: string;
}
