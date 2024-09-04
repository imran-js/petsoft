"use client";
import React from "react";
import H1 from "./H1";
import usePetContext from "./hooks/usePetContext";

function Branding() {
  const { PetsCount } = usePetContext();

  return (
    <>
      <section>
        <H1>
          Pet <span className="font-semibold">Soft</span>
        </H1>
        <p className="text-lg opacity-80">Manage your pet daycare with ease.</p>
      </section>
      <section className="text-center">
        <p className="font-medium text-2xl leading-6">{PetsCount}</p>
        <p className="opacity-80">Current Guest</p>
      </section>
    </>
  );
}

export default Branding;
