export type ThemeFontProps = {
  thin?: string;
  regular?: string;
  medium?: string;
  semiBold?: string;
  bold?: string;
};

export const defaultFont: ThemeFontProps = {
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  medium: 'Poppins-Medium',
};
