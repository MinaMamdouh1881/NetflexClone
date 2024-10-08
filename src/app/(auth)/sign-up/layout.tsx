export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grow flex justify-center items-center w-full'>
      <div className='flex flex-col justify-center items-center text-center gap-4'>
        <h1 className='text-3xl md:text-5xl font-semibold'>
          Unlimited Movies, TV Shows, And More
        </h1>
        <h3 className='text-xl md:text-3xl'>Watch Anywhere. Cancel Anytime. </h3>
        <p>
          Ready to Watch? Enter Your Email To Create Or Restart Your Membership
        </p>
        {children}
      </div>
    </div>
  );
}
