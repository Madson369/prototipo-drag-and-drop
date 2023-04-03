import { useState } from "react";
import { MultiTables } from "./components/teste";
import "./App.css";
import { data } from "./consts";
import { Tabugado } from "./components/tabugado";

function App() {
  const stages = [
    "Qualificação",
    "Proposta",
    "Negociação",
    "Fechado Perdido",
    "Fechado Ganho",
  ];

  const numObjects = 2000; // número de objetos a serem gerados
  const objects = [];

  for (let i = 0; i < numObjects; i++) {
    let newTitle = stages[Math.floor(Math.random() * stages.length)];
    const id = i + 1; // id começa em 1
    const title = newTitle + id; // título é uma string com o número do objeto
    const stageName = newTitle; // escolhe aleatoriamente um estágio

    objects.push({ id, title, stageName }); // adiciona o objeto ao array de objetos
  }

  console.log(objects);
  return (
    <>
      <MultiTables data={data}></MultiTables>
      {/* <Tabugado data={data}></Tabugado> */}
    </>
  );
}

export default App;
