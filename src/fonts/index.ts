import localFont from 'next/font/local';

/**
 * Loading the DIN Pro font using Next.js local font loader.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts
 */

export const dinProFont = localFont({
  variable: '--font-din-pro',
  display: 'swap',
  src: [
    {
      path: './din/DINW05-Extlight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './din/DINW05-ExtlightItalic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: './din/DINW05-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './din/DINW05-LightItalic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './din/DINW05-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './din/DINW05-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './din/DINW05-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './din/DINW05-MediumItalic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './din/DINW05-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './din/DINW05-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
  ],
});
