import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual } from 'react-redux'
import { selectCurrentMaterials } from "../MaterialsSlice"
import NewMaterialBtn from "../../invoice/NewMaterialBtn.js";
import { useUpdateMaterialMutation } from "../materialsApiSlice"
import {
  //closestCenter,
  DndContext,
  TouchSensor,
  MouseSensor,
  //DragOverlay,
  //DragStartEvent,
  useSensor,
  useSensors,
  //PointerSensor,
  KeyboardSensor,
  //useDndContext,
  //LayoutMeasuringStrategy,
  //DragEndEvent
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates
} from "@dnd-kit/sortable";

//import { Droppable } from "./Droppable";
//import { Draggable } from "./Draggable";
import SortableItem from "./SortableItem";

const Dnd = ({ materials }) => {

  const [updateMaterial] = useUpdateMaterialMutation()

  const updOrder = async (items) => {
    console.log("items");
    console.log(items);

    await Promise.all(items.slice(0).map((item, index) =>
      updateMaterial({ id: item._id, index: index })
    ));
  }

  //const selectTodoIds = state => state.materials.map(material => material.item_id)
  //const update_rows = useSelector(selectTodoIds, shallowEqual)

  //console.dir(update_rows);

  //console.log("1111111111111111111111" + update_rows);
  //console.dir(update_rows);


  //const [increment, setIncrm] = useState();
  //console.log("2222222222222222222222");
  //console.log(increment);

  //const getIncrm = (x) => {

  //  const result = update_rows
  //    .filter(material => material.item_id === x._id)
  //    .map(item => item.count);



  //  setIncrm(result)


  //};

  const [items, setItems] = useState([]);
  useEffect(() => {
    setItems(materials)
  }, [materials?.length]);
  //console.log(materials.materials);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );
  //const [isDropped, setIsDropped] = useState(false);
  //const [parent, setParent] = useState(null);

  //const containers = ["A", "B", "C"];

  //const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;
  const handleDragStart = (props) => {
    console.log(props);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(({ id }) => id === active.id)
        const newIndex = items.findIndex(({ id }) => id === over.id)
        console.log("before")
        console.dir(items)
        console.log(oldIndex)
        console.log(newIndex)
        //materials.updOrder(oldIndex, newIndex);
        //materials.updOrder(newIndex, oldIndex);
        updOrder(arrayMove(items, oldIndex, newIndex))
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragCancel = () => { };

  console.log("after")
  console.dir(items)
  //materials.onChange(items);
  //materials.updOrder(items);

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
    >
      <table
        className="
            table table-striped table-sm table-bordered
            table-hover
            m-0
            collapse
          "
        id="collapseExample"
      >
        <tbody>
          <tr>
            <th scope="col" colSpan="3" className="align-middle text-center">
              Наименование
            </th>
            <th scope="col" className="align-middle text-center">
              Ед. изм.
            </th>
            <th scope="col" className="align-middle text-center">
              Кол-во
            </th>
            <th scope="col" className="align-middle text-center">
              Стоимость
            </th>
          </tr>
          <SortableContext items={items}>
            {items.map((x) => (


              //if (update_rows.some((sort) => sort.item_id === x._id))
              //  return update_rows;
              //  {
              //if (update_rows) {
              //const incrm = items.filter(a => update_rows.some(b => a._id === b.item_id))
              //<SortableItem key={x._id} material={x} incrm={(incrm ? incrm.count : [])}/>
              <SortableItem key={x._id} material={x} />

              //inc={update_rows.filter(material => material === x._id)}/>
              //.map(item => item.count)}/>
              //  }
            )
              //<SortableItem key={x._id} material={x}/>
            )}
          </SortableContext>
          <NewMaterialBtn />
        </tbody>
      </table>
    </DndContext>
  );
};

export default Dnd