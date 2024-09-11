"use client";
import Image from "next/image";
import usePetContext from "./hooks/usePetContext";
import PetButton from "./PetButton";
import { PetWithId } from "./types/types";

function PetDetail() {
  const { handleGetPet } = usePetContext();
  const pet = handleGetPet;

  return (
    <main className="w-full h-full flex flex-col">
      {pet ? (
        <>
          <TopBar pet={pet} />
          <OtherDetails pet={pet} />
          <Notes pet={pet} />
        </>
      ) : (
        <EmptyView />
      )}
    </main>
  );
}

type Props = {
  pet: PetWithId;
  disabled?: boolean;
};

function EmptyView() {
  return (
    <p className="h-full flex justify-center items-center text-lg font-bold">
      Select pet to view details
    </p>
  );
}

function TopBar({ pet }: Props) {
  const { handlePetCheckout } = usePetContext();

  return (
    <div className="flex items-center px-8 py-5 bg-white border-b border-light shadow-lg">
      <Image
        className="size-[75px] rounded-full object-cover"
        alt="Pet image"
        src={pet?.imageUrl!}
        height={75}
        width={75}
      />
      <h2 className="text-3xl font-semibold leading-7 ml-5">{pet.name}</h2>
      <div className="ml-auto space-x-2">
        <PetButton type="Edit">Edit</PetButton>
        <PetButton
          onClick={async () => {
            handlePetCheckout(pet.id);
          }}
          type="Checkout"
        >
          Checkout
        </PetButton>
      </div>
    </div>
  );
}

function OtherDetails({ pet }: Props) {
  return (
    <div className="flex justify-around py-10 px-5 text-center ">
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">
          Owner Name
        </h3>
        <p>{pet.name}</p>
      </div>
      <div>
        <h3 className="text-[13px] font-medium uppercase text-zinc-700">Age</h3>
        <p>{pet.age}</p>
      </div>
    </div>
  );
}

function Notes({ pet }: Props) {
  return (
    <section className="bg-white py-5 px-8 rounded flex-1 mb-9 mx-8 border border-light shadow-lg ">
      {pet.notes}
    </section>
  );
}

export default PetDetail;
