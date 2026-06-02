import { Playfair_Display, DM_Sans } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  weight: ['400', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
});

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'IamBALA — Children\'s Neurodevelopmental Foundation | Казахстан',
  description:
    'IamBALA Public Foundation improves developmental outcomes for children with autism, cerebral palsy, and developmental delays in Central Asia through early diagnosis, evidence-based rehabilitation, and specialist training.',
  keywords:
    'IamBALA, neurodevelopmental, autism, cerebral palsy, Kazakhstan, Shymkent, early intervention, Basqa Development Space, Diagnostic 360, детский невролог',
  openGraph: {
    title: 'IamBALA Public Foundation',
    description: 'Improving lives of children with neurodevelopmental disorders in Central Asia.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="font-sans text-brand-text bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
