export interface GTAGTrackEvent {
  eventCategory?: string
  eventLabel?: string
  value?: string
  tagID?: string
  page_path?: string
  send_to?: string
}


export enum GTAGTrackEvents {
  pageView = 'page_view',
  formStart = 'form_start',
  formSubmit = 'form_submit'
}
