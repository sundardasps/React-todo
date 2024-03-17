import React from "react";
import {  useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Breadcrumbs,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";

import { TodoInput } from "./TodoInput";
import { addCompleted, deleteTodo, getTodoList } from "../../api/userApi";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { TrashIcon } from "@heroicons/react/24/outline";

function TodoComp() {
  const [filter, setFilter] = React.useState();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["todoList", { filter }],
    queryFn: async () => {
      const response = await getTodoList(filter);
      return response;
    },
  });

  const handleFilter = (value) => {
    setFilter(value);
  };

  const onDragEnd = async (result) => {
    try {
      const { draggableId } = result;
      const handleComplete = async () => {
        const response = await addCompleted(draggableId);
        if (response.status === 200) {
          queryClient.invalidateQueries("todoList");
        }
      };

      const handleDelete = async () => {
        const response = await deleteTodo(draggableId);
        if (response.status === 200) {
          queryClient.invalidateQueries("todoList");
        }
      };

      if (result.destination.droppableId === "TodoCompleted") {
        handleComplete();
      }

      if (
        (result.destination.droppableId === "TodoDelete" &&
          result.source.droppableId === "Todopending") ||
        (result.destination.droppableId === "Todopending" &&
          result.source.droppableId === "TodoCompleted") 
          ||
        (result.destination.droppableId === "TodoDelete" &&
          result.source.droppableId === "TodoCompleted")
      ) {
        handleDelete();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex  mx-auto border  p-1 bg-blue-gray-50 ">
        <div className="w-3/4    relative ">
          <div className="flex  justify-between ">
            <Breadcrumbs fullWidth>
              <Link to={"/todo"}>Home</Link>
            </Breadcrumbs>
            <div className="w-72">
              <Select
                value={filter}
                onChange={handleFilter}
                label="Filter"
              >
                <Option value="immediate">Immediate-task</Option>
                <Option value="daily">Daily-task</Option>
                <Option value="longterm">Longterm-task</Option>
                <Option value="">All</Option>
              </Select>
            </div>
            <TodoInput />
          </div>
          <Droppable droppableId="Todopending">
            {(provided, snapshot) => (
              <div
                className={`grid  h-screen grid-rows-5 overflow-hidden  xl:grid-cols-3 md:grid-cols-2`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data &&
                  data.data.map(
                    (value, index) =>
                      !value.status && (
                        <Draggable
                          key={value._id}
                          draggableId={value._id}
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
                                <div className="absolute top-6 w-[15rem] border  right-8 rounded-xl rounded-tl-none scrollable   shadow-sm shadow-blue-gray-600 mt-0 bg-white h-16 hover:shadow-md">
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
                                    (value?.type === "daily" &&
                                      "bg-amber-500") ||
                                    (value?.type === "immediate" &&
                                      "bg-deep-orange-500")
                                  } pt-1 ml-8 flex border shadow-md shadow-blue-gray-600 hover:shadow-md`}
                                >
                                  <div className="absolute left-8 top-0 rounded-full r w-3 h-3 bg-white border shadow-inner  shadow-blue-gray-600 m-2 "></div>
                                  <Typography
                                    color="white"
                                    className=" font-sans font-medium text-xs "
                                  >
                                    <TypeAnimation
                                      cursor={false}
                                      sequence={["Pending...", 4000, ""]}
                                      wrapper="h2"
                                      className="mb-10"
                                      repeat={Infinity}
                                    />
                                  </Typography>
                                  {/* <div className="  w-4 h-4 bg-red-500 rounded-full border-2 animate-bounce border-white" /> */}
                                </div>
                              </Link>
                            </div>
                          )}
                        </Draggable>
                      )
                  )}
              </div>
            )}
          </Droppable>
        </div>
        <Droppable droppableId="TodoCompleted">
          {(provided) => (
            <div
              className="w-80  overflow-x-hidden outline-dotted m-1 scrollable"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <Typography variant="small m-3" className="text-center ">
                Drag and drop here to Complete
              </Typography>

              {data &&
                data.data.map(
                  (value, index) =>
                    value.status && (
                      <Draggable
                        key={value._id}
                        draggableId={value._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            className="relative w-[20rem]  my-2 h-16  cursor-pointer  mb-10"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <Link to={"/todoDetails"} state={value._id}>
                              <div className="absolute top-6 w-[15rem] border right-8 rounded-xl rounded-tl-none scrollable  shadow-sm shadow-blue-gray-600 mt-0 bg-white h-16 hover:shadow-md">
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
                                      repeat={Infinity}
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
                    )
                )}
            </div>
          )}
        </Droppable>
      </div>
      <Droppable droppableId="TodoDelete">
        {(provided) => (
          <div className="flex absolute top-auto bg-blue-gray-50  left-0 right-0 justify-center cursor-pointer ">
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`bg-blue-gray-100 outline-dotted w-max h-auto p-5 rounded-3xl text-center    hover:w-1/3  `}
            >
              <Typography color="white" className="flex mb-1">
                <TrashIcon className="w-10 my-auto" />
                <span className="m-auto"> Drop to delete</span>
              </Typography>
              <span className="text-xs text-white">
                Drop the item for delete!
              </span>
            </div>
          </div>
          
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default TodoComp;
