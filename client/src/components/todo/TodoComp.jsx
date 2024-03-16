import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Typography } from "@material-tailwind/react";

import { TodoInput } from "./TodoInput";
import { getTodoList } from "../../api/userApi";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

function TodoComp() {
  const [active, setActive] = React.useState(1);
  const [todoList, setTodoList] = useState([]);

  const getItemProps = (index) => ({
    className: active === index ? "bg-gray-100 text-gray-900" : "",
    onClick: () => setActive(index),
  });

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };

  const { data } = useQuery({
    queryKey: ["todoList"],
    queryFn: async () => {
      const response = await getTodoList();
      return response;
    },
  });

  //---------------------- Drag functions ------------------//

  const dragStart = () => {};
  const onDrag = () => {};
  const dragEnd = () => {};

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="flex  mx-auto border scrollable bg-blue-gray-50 ">
        <div className="h-screen  relative">
          <div className="flex  justify-between">
            <TodoInput />
          </div>

          <Droppable droppableId="Todopending">
            {(provided) => (
              <div
                className="grid border   xl:grid-cols-3 md:grid-cols-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data &&
                  data.data.map((value, index) => (
                    <Draggable
                      key={value.title}
                      droppableId={value._id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="relative w-[20rem] my-2 h-16  cursor-pointer  mt-6"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <Link to={"/todoDetails"} state={value._id}>
                            <div className="absolute top-6 w-[15rem] border  right-8 rounded-xl rounded-tl-none scrollable  shadow-sm shadow-blue-gray-600 mt-0 bg-white h-16 hover:shadow-md">
                              <Typography
                                color="black"
                                className=" ml-2 pt-1 font-semibold capitalize"
                              >
                                {value.title}
                              </Typography>
                            </div>
                            <div
                              className={`w-[15rem] justify-end px-2 rounded-xl  rounded-tl-none h-16 ${
                                (value?.type === "longterm" &&
                                  "bg-light-blue-500") ||
                                (value?.type === "daily" && "bg-amber-500") ||
                                (value?.type === "immediate" &&
                                  "bg-deep-orange-500")
                              } pt-1 ml-8 flex border shadow-md shadow-blue-gray-600 hover:shadow-md`}
                            >
                              <div className="absolute left-8 top-0 rounded-full r w-3 h-3 bg-white border shadow-inner  shadow-blue-gray-600 m-2 "></div>
                              <Typography
                                color="white"
                                className="font-sans font-medium text-xs"
                              >
                                {value.status ? (
                                  <TypeAnimation
                                    cursor={false}
                                    sequence={["Complete...", 5000, ""]}
                                    wrapper="h2"
                                    className="mb-10"
                                  />
                                ) : (
                                  <TypeAnimation
                                    cursor={false}
                                    sequence={["Pending...", 5000]}
                                    wrapper="h2"
                                    className="mb-10"
                                  />
                                )}
                              </Typography>
                              {/* <div className="  w-4 h-4 bg-red-500 rounded-full border-2 animate-bounce border-white" /> */}
                            </div>
                          </Link>
                        </div>
                      )}
                    </Draggable>
                  ))}
              </div>
            )}
          </Droppable>
        </div>
        {/* <div className="bg-white right-0 flex items-center text-black h-10 rounded-none w-1/54 text-center outline-black bg-transparent outline-dashed hover:h-16 cursor-pointer  p-3">
          Drag and drop for complete task.
        </div> */}
        <Droppable droppableId="TodoCompleted">
          {(provided) => (
            <div
              className="w-80 bg-black "
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              jjjjjjjjjjjjjjjjjjj
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default TodoComp;
