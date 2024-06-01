import LATEST from "../assets/latest";
import Item from "../components/Item";
function NewCollection() {
  return (
    <section className="max-w-screen ">
      <div className="bg-gray-300 rounded-3xl py-12 xl:py-28">
        <div className="mx-auto w-[98%]">
          <h3 className="xl:text-[50px] ">
            New Latest Collection <span>Products!</span>
          </h3>
          {/* */}
          <div className="grid xl:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 ">
            {LATEST.map((item) => (
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

export default NewCollection;
