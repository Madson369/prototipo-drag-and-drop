import React, { useCallback, useEffect, useRef, useState } from "react";
import { Container, CardContainer, Card, CardHeader } from "./styles";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

export const MultiTables = ({ data }) => {
  const dragItem = useRef();
  const dragOverItem = useRef();

  const [qualificação, setQualificação] = useState([]);
  const [proposta, setProposta] = useState([]);
  const [negociacao, setNegociacao] = useState([]);
  const [fechadoPerdido, setFechadoPerdido] = useState([]);
  const [fechadoGanho, setFechadoGanho] = useState([]);
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

  const dragStart = (e, position, startingList) => {
    console.log(e.target.id);
    e.dataTransfer.setData(
      "text/html",
      JSON.stringify({
        id: e.target.id,
        parent: startingList,
      })
    );
    dragItem.current = position;
    // setStartList(startingList);
  };

  const dragEnter = (e, position) => {
    dragOverItem.current = position;
  };

  const drop = (e) => {
    if (!e.dataTransfer.getData("text/html").includes("draggable")) {
      dragItem.current = null;
      dragOverItem.current = null;
      // setStartList("");
      setCurrentList("");
      return;
    }
    console.log(
      '!!! e.dataTransfer.getData("text/html")',
      e.dataTransfer.getData("text/html")
    );

    const startList = JSON.parse(e.dataTransfer.getData("text/html")).parent;
    if (startList === currentList) {
      const copyListItems = [...dados[currentList]];
      const dragItemContent = copyListItems[dragItem.current];
      copyListItems.splice(dragItem.current, 1);
      copyListItems.splice(dragOverItem.current, 0, dragItemContent);
      dragItem.current = null;
      dragOverItem.current = null;
      controllers[currentList]([...copyListItems]);
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
    setCurrentList("");
  };

  const card = (props) => {
    if (props.data.length === 0) {
      return <div></div>;
    }

    const cardProps = props.data.array[props.index];

    return (
      <Card
        style={props.style}
        onDragStart={(e) => dragStart(e, props.index, props.data.list)}
        onDragEnter={(e) => dragEnter(e, props.index)}
        // onDragEnd={(event) => {
        //   drop();
        // }}
        draggable={true}
        key={cardProps.id}
        id={"draggable" + cardProps.id}
      >
        {cardProps.title}
      </Card>
    );
  };

  const returnList = (arr, name) => {
    if (!arr) {
      return [];
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={arr.length}
            itemSize={25}
            width={width}
            itemData={{ array: arr, list: name }}
          >
            {card}
          </List>
        )}
      </AutoSizer>
    );
    // return arr.map((item, index) => {
    //   return (
    //     <Card
    //       onDragStart={(e) => dragStart(e, index)}
    //       onDragEnter={(e) => dragEnter(e, index)}
    //       // onDragEnd={(event) => {
    //       //   drop();
    //       // }}
    //       draggable={true}
    //       key={item.id}
    //       id={"draggable" + item.id}
    //     >
    //       {item.title}
    //     </Card>
    //   );
    // });
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
            {returnList(dados[nome], nome)}
          </CardContainer>
        );
      })}
    </Container>
  );
};
