import { Playfair_Display, Nunito } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({
  weight: ['400', '700', '800'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-display',
  display: 'swap',
});

const nunito = Nunito({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'IamBALA — Общественный Фонд | Шымкент, Казахстан',
  description:
    'ОФ «IamBALA» развивает инклюзивное общество в Казахстане, наделяя детей с особенностями развития, их семьи и всех людей в уязвимом положении знаниями, инструментами и силой.',
  keywords:
    'IamBALA, инклюзия, дети с ОВЗ, Казахстан, Шымкент, инклюзивное образование, творчество, цифровая инклюзия, НКО, общественный фонд',
  openGraph: {
    title: 'IamBALA — Я есть · Мен бармын · I am',
    description: 'Инклюзивное общество для каждого ребёнка в Казахстане.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru" className={`${playfair.variable} ${nunito.variable}`}>
      <body className="font-sans text-brand-text bg-white antialiased">
        {children}
      </body>
    </html>
  );
}
