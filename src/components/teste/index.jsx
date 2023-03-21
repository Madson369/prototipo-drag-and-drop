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
    dragItem.current = position;
    setStartList(e.target.parentNode.id);
  };
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  useEffect(() => {
    console.log(dragOverItem.current);
  }, [dragOverItem.current]);
  const drop = (e) => {
    if (startList === currentList) {
      const copyListItems = [...dados[currentList]];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      controllers[currentList]([...copyListItems]);
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
          onDragEnd={drop}
          draggable
          key={item.id}
        >
          {item.title}
        </Card>
      );
    });
  };

  return (
    <Container>
      {nomes.map((nome) => {
        return (
          <CardContainer
            key={nome}
            onDragOver={(event) => {
              event.preventDefault();
              setCurrentList(nome);
            }}
            id={nome}
          >
            <CardHeader>
              <h3>{nome}</h3>
            </CardHeader>
            {returnList(dados[nome])}
          </CardContainer>
        );
      })}
    </Container>
  );
};
