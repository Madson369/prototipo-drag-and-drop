import React, { useEffect, useRef, useState } from "react";
import { Container, CardContainer, Card, CardHeader } from "./styles";

export const MultiTables = ({ data }) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [qualificação, setQualificação] = useState([]);
  const [proposta, setProposta] = useState([]);
  const [negociacao, setNegociacao] = useState([]);
  const [fechadoPerdido, setFechadoPerdido] = useState([]);
  const [fechadoGanho, setFechadoGanho] = useState([]);
  const [startList, setStartList] = useState("");
  const [currentList, setCurrentList] = useState("");

  const nomes = [
    "Qualificação",
    "Proposta",
    "Negociação",
    "Fechado Perdido",
    "Fechado Ganho",
  ];

  const dados = {
    Qualificação: qualificação,
    Proposta: proposta,
    Negociação: negociacao,
    "Fechado Perdido": fechadoPerdido,
    "Fechado Ganho": fechadoGanho,
  };

  const controllers = {
    Qualificação: setQualificação,
    Proposta: setProposta,
    Negociação: setNegociacao,
    "Fechado Perdido": setFechadoPerdido,
    "Fechado Ganho": setFechadoGanho,
  };

  useEffect(() => {
    if (data?.length > 0) {
      setQualificação(
        data.filter((item) => {
          return item.stageName === "Qualificação";
        })
      );
      setProposta(
        data.filter((item) => {
          return item.stageName === "Proposta";
        })
      );
      setNegociacao(
        data.filter((item) => {
          return item.stageName === "Negociação";
        })
      );
      setFechadoPerdido(
        data.filter((item) => {
          return item.stageName === "Fechado Perdido";
        })
      );
      setFechadoGanho(
        data.filter((item) => {
          return item.stageName === "Fechado Ganho";
        })
      );
    }
  }, [data]);

  const dragStart = (e, position) => {
    e.dataTransfer.setData("text/html", e.target.id);
    dragItem.current = position;
    setStartList(e.target.parentNode.id);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (event) => {
    if (!event.dataTransfer.getData("text/html").includes("draggable")) {
      dragItem.current = null;
      dragOverItem.current = null;
      setStartList("");
      setCurrentList("");
      return;
    }
    const copyOriginal = [...dados[startList]];
    const copyCurrent = [...dados[currentList]];
    const dragItemContent = copyOriginal[dragItem.current];
    copyOriginal.splice(dragItem.current, 1);
    copyCurrent.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    controllers[startList]([...copyOriginal]);
    controllers[currentList]([...copyCurrent]);
    setStartList("");
    setCurrentList("");
  };
  const returnList = (arr, stage) => {
    if (!arr) {
      return [];
    }
    return arr.map((item, index) => {
      return (
        <Card
          onDragStart={(e) => dragStart(e, index)}
          onDragEnter={(e) => dragEnter(e, index)}
          // onDragEnd={(event) => {
          //   drop();
          // }}
          draggable={true}
          key={item.id}
          id={"draggable" + item.id}
        >
          {item.title}
        </Card>
      );
    });
  };

  return (
    <Container draggable={false}>
      {nomes.map((nome) => {
        return (
          <CardContainer
            draggable={false}
            key={nome}
            onDragOver={(event) => {
              event.preventDefault();
              setCurrentList(nome);
            }}
            onDrop={(event) => {
              drop(event);
            }}
            id={nome}
          >
            <CardHeader draggable={false}>
              <h3>{nome}</h3>
            </CardHeader>
            {returnList(dados[nome])}
          </CardContainer>
        );
      })}
    </Container>
  );
};
