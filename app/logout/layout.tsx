import '../globals.css';

export const metadata = {
  title: 'Logout',
  description: 'Twitter logout',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen relative">
        <div className="dark w-full h-full bg-brand-black  flex justify-center items-center">
          {children}
        </div>
      </body>
    </html>
  );
}
