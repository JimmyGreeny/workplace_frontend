import React from "react";
import { useDroppable } from "@dnd-kit/core";
import styled from "styled-components";

const Wrapper = styled.div`
  border: 1px dashed gray;
  padding: 0.5rem 1rem;
  margin-bottom: 0.5rem;
  background-color: white;
  cursor: move;
  opacity: 1;
`;

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable"
  });
  const style = {
    color: isOver ? "green" : undefined
  };

  return (
    <Wrapper ref={setNodeRef} style={style}>
      {props.children}
    </Wrapper>
  );
}