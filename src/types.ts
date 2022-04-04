export interface CustomerParam {
  app: string;
  platform: string;
  name?: string;
  email?: string;
  phone?: string;
  screen?: string;
  hiddenFields?: string[];
  groupId?: string;
  issueId?: string;
}
