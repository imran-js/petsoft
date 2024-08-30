import Image from "next/image";

function PetList({ pets }: any) {
  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {/* @ts-ignore */}
      {pets.map((pet) => (
        <li key={pet.id} className="my-3">
          <button className="flex cursor-pointer h-[70] w-full items-center px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition">
            <Image
              className="rounded-full object-cover w-[45px] h-[45]"
              alt="Pet image"
              src={pet.imageUrl}
              width={45}
              height={45}
            />
            <p className="font-semibold">{pet.name}</p>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default PetList;
