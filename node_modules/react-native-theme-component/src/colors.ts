export type ThemeColorProps = {
  primaryColor?: string;
  secondaryColor?: string;
  primaryTextColor?: string;
  secondaryTextColor?: string;
  primaryButtonColor?: string;
  secondaryButtonColor?: string;
  primaryButtonLabelColor?: string;
  secondaryButtonLabelColor?: string;
  mainBackgroundColor?: string;
  secondaryBackgroundColor?: string;
  dividerColor?: string;
  appBarBackgroundColor?: string;
  appBarTextColor?: string;
  loadingIndicatorColor?: string;
};

export const defaultColors: ThemeColorProps = {
  primaryColor: '#0073F0',
  secondaryColor: '#0073F0',
  primaryTextColor: '#0C3F79',
  secondaryTextColor: '#0C3F79',
  primaryButtonColor: '#0073F0',
  secondaryButtonColor: '#ffffff',
  primaryButtonLabelColor: '#ffffff',
  secondaryButtonLabelColor: '#0073F0',
  mainBackgroundColor: '#ffffff',
  secondaryBackgroundColor: '#f7f9fb',
  dividerColor: '#e2e2e2',
  appBarBackgroundColor: '$ffffff',
  appBarTextColor: '#0C3F79',
  loadingIndicatorColor: '#0073F0',
};
