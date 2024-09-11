"use client";
import Image from "next/image";
import usePetContext from "./hooks/usePetContext";
import { cn } from "@/lib/utils";
import useSearchContext from "./hooks/useSearchContext";

function PetList() {
  const { pets, selectedPetId, handleUpdatePetId } = usePetContext();

  const { searchQuery } = useSearchContext();

  const SearchFilter = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ul className="bg-white border-b border-black/[0.08]">
      {SearchFilter.map((pet) => (
        <li key={pet.id} className="my-3">
          <button
            onClick={() => handleUpdatePetId(pet.id)}
            className={cn(
              "flex cursor-pointer h-[70px] w-full items-center px-5 text-base gap-3 hover:bg-[#eff1f2] focus:bg-[#eff1f2] transition",
              {
                "bg-[#eff1f2]": selectedPetId == pet.id,
              }
            )}
          >
            <Image
              className="rounded-full object-fit size-[45px]"
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
