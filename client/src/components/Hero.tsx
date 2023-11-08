const Hero = () => {
  return (
    <section className="hero-background w-full h-screen">
      <div className="container mx-auto flex justify-center h-full">
        <div className="flex flex-col justify-center items-center h-fit w-fit p-4 bg-black/50 rounded-lg mt-10">
          <h1 className="text-[30px] sm:text-[50px] md:text-[70px] leading-[1.1] text-white/70">
            STELLAR STYLE
          </h1>
          <span className="font-semibold text-gray-400/70 text-sm sm:text-base">
            To shop in Stellar Style, you need to login.
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
