import POPULAR from "../assets/popular";
import Item from "../components/Item";

function Popular() {
  return (
    <section className="max-w-full">
      <div className="bg-gray-300 rounded-3xl py-12 xl:py-28">
        <div className="mx-auto w-[98%]">
          <h3 className="text-[60px]">
            Popular <span>Products!</span>
          </h3>
          <div className="grid xl:grid-cols-2 md:grid-cols-2 xs:grid-cols-1">
            {POPULAR.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                image={item.image}
                old_price={item.old_price}
                new_price={item.new_price}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Popular;
