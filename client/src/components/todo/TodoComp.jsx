import React from "react";
import {
  IconButton,
  ButtonGroup,
  Card,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowRightIcon,
  ArrowLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/outline";
import { TodoInput } from "./TodoInput";

function TodoComp() {
  const [active, setActive] = React.useState(1);

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

  return (
    <div className="container mx-auto bg-blue-gray-100 ">
      <div className="h-screen p-1">
        <div className="flex justify-between">
          <Card className="rounded-l-none  shadow-md border border-gray-700  bg-transparent w-20 h-11 p-1 ">
            <Typography variant="h6">Today</Typography>
            <p className="text-xs">13/3/2024</p>
          </Card>
          <TodoInput />
        </div>

        <div className="p-6 flex gap-2">
          <Card className="w-80  h-max  rounded-none cursor-pointer">
            <div className="rounded-none  shadow-none mt-0 bg-blue-gray-300 h-16 ">
              <div className="absolute top-1  rounded-full border-1 border-blue-gray-200 w-3 h-3 bg-blue-gray-100  m-2"></div>
              <Typography color="white" className=" ml-7 px-3 pt-1">
                Need to learn data sructure algoritum
              </Typography>
            </div>
            <div className="p-0 mt-min  ml-8 flex">
              <Typography variant="small" className="font-sans font-medium ">
                pending...
              </Typography>
              {/* <div className="  w-4 h-4 bg-red-500 rounded-full border-2 animate-bounce border-white" /> */}
            </div>
          </Card>
        </div>
      </div>
      <div className="flex justify-center">
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
      </div>
    </div>
  );
}

export default TodoComp;
