import Giglist from "./giglist";
export default async function Page() {
  return (
    <div>
      <div className="m-4">
        <h2 className="text-3xl font-bold leading-tight text-gray-800 sm:text-3xl lg:text-4xl">
          Trusted by world class Freelancing companies & design teams
        </h2>
      </div>
      <Giglist />
    </div>
  );
}
