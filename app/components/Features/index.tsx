
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Features = () => {
  return (
    <>
      <section
        id="features"
        className="bg-primary/[.03] py-4 md:py-20 lg:py-28"
      >
        <div className="">
          <div className="w-full flex justify-center">
            <div className=" w-11/12 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {featuresData.map((feature) => (
                <SingleFeature key={feature.id} feature={feature} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;
