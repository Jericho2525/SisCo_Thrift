import { Link } from "react-router-dom";
import { MdOutlineLocalOffer } from "react-icons/md";
import bgHero from "../assets/bg.png";

function Hero() {
  return (
    <section className="max-w-full mx-5">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 justify-center h-[590px] object-cover bg-no-repeat max-w-full bg-cover rounded-lg" style={{ backgroundImage: `url(${bgHero})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh', objectFit: 'cover' }}>

        <div className="p-6 relative top-16 xs:top-52 ">
          <h2 className="mb-2  max-w-[500px] font-bold">
            Discover Quality <br/><span className="text-orange-500 uppercase font-bold text-[40px]">Product Seamless</span><br/> Shopping{" "}
          </h2>
          <p className="max-w-[450px] p-2 font-semibold">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>

          <div className="max-xs:flex-col flex gap-5 mt-4">
            <Link to={"/"} className="bg-black rounded-full flex justify-center text-white items-center pl-5 pr-4 pt-2 pb-2 font-semibold hover:bg-orange-500 hover:text-black">Shop Now</Link>
            <Link to={"/"} className="bg-black rounded-full flex justify-center text-white p-4 items-center font-semibold hover:bg-orange-500 hover:text-black ">Offers<MdOutlineLocalOffer className="ml-2 h-4 w-4 group-hover:rotate-45 transition-all duration-500"/></Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
