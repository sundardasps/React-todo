import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, Typography } from "@material-tailwind/react";

import { TodoInput } from "./TodoInput";
import { getTodoList } from "../../api/userApi";
import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";

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

  console.log(data?.data);

  return (
    <div className="container mx-auto border scrollable bg-blue-gray-50 p-5">
      <div className="h-screen p-1 ">
        <div className="flex">
          <TodoInput />
        </div>

        <div className="grid xl:grid-flow-col md:grid-cols-2">
          {data &&
            data.data.map((value, i) => (
              <Link key={value.title} to={"/todoDetails"} state={value._id}>
                <div className="relative w-[20rem] my-2 h-16  cursor-pointer  mt-6">
                  <div className="absolute top-6 w-[16.7rem] border  right-0 rounded-xl rounded-tl-none scrollable  shadow-sm shadow-blue-gray-600 mt-0 bg-white h-16 hover:shadow-md">
                    <Typography
                      color="black"
                      className=" ml-2 pt-1 font-semibold capitalize"
                    >
                      {value.title}
                    </Typography>
                  </div>
                  <div
                    className={`w-[17rem] justify-end px-2 rounded-xl  rounded-tl-none h-16 ${
                      (value?.type === "longterm" && "bg-light-blue-500") ||
                      (value?.type === "daily" && "bg-amber-500") ||
                      (value?.type === "immediate" && "bg-deep-orange-500")
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
                </div>
              </Link>
            ))}
        </div>
      </div>
      {/* <div className="flex justify-center">
        <ButtonGroup variant="outlined">
          <IconButton onClick={prev}>
            <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
          <IconButton {...getItemProps(1)}>1</IconButton>
          <IconButton {...getItemProps(2)}>2</IconButton>
          <IconButton {...getItemProps(3)}>3</IconButton>
          <IconButton {...getItemProps(4)}>4</IconButton>
          <IconButton {...getItemProps(5)}>5</IconButton>
          <IconButton onClick={next}>
            <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
          </IconButton>
        </ButtonGroup>
      </div> */}
    </div>
  );
}

export default TodoComp;
