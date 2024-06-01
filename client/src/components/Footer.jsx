import { Link } from "react-router-dom";
import Footer_Link from "../assets/footer_links";
import FOOTER_CONTACT_INFO from "../assets/footer_contact.js"
const Footer = () => {
  return (
    <div className="bg-black max-w-screen p-8 rounded-lg flex justify-between items-center static bottom-0 w-full h-[310px] z-10">
 
      <div className="w-[300px]">
        <h1 className="text-white text-[30px] font-bold">
          Sis<span className="text-[40px] text-orange-400">Co</span> Thrift
        </h1>
        <p className="text-white">
          Nisi consectetur aliqua occaecat deserunt exercitation minim pariatur
          nisi magna Lorem mollit deserunt non adipisicing. Culpa non deserunt
          irure voluptate in commodo duis dolor ut culpa officia quis. Eu esse
          consequat sunt enim adipisicing irure voluptate anim irure ex sit eu
          et. Est labore velit eu laboris commodo cillum fugiat quis sunt amet
          in eu deserunt elit.
        </p>
      </div>

      

      <div className="ml-32 text-white">
        {Footer_Link.map((col) => (
          <FooterColumn title={col.title} key={col.title}>
            <ul className="my-4">
              {col.links.map((liks) => (
                <Link to={"/"} key={liks}>
                  {liks}
                </Link>
              ))}
            </ul>
          </FooterColumn>
        ))}

        <div >
        <FooterColumn title={FOOTER_CONTACT_INFO.title}></FooterColumn>
        </div>
      </div>
    </div>
  );
};

const FooterColumn = ({ title, children }) => {
  return (
    <div>
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Footer;
