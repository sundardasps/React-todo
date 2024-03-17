import { QueryClient, useQuery } from "@tanstack/react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { editTodo, getTotoDetails } from "../../api/userApi";
import {
  Breadcrumbs,
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  Typography,
} from "@material-tailwind/react";
import toast from "react-hot-toast";
import { todoSchema } from "../../utils/yupValidation";
import { useFormik } from "formik";
import { useState } from "react";

function TodoEdit() {
  const [longTerm, setLongTerm] = useState(false);
  const locationn = useLocation();
  const todoId = locationn.state;
  const navigate = useNavigate();
  const openDate = () => setLongTerm(true);

  const { data } = useQuery({
    queryKey: ["todoDetails", todoId],
    queryFn: async () => {
      const response = await getTotoDetails(todoId);
      return response;
    },
  });

  let date;
  if (data?.data?.date) {
    const parts = data?.data?.date.split("/");
    const month = parseInt(parts[0], 10);
    const day = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
    date = `${day}/0${month}/${year}`;
  }

  const initialValues = {
    title: data?.data?.title,
    description: data?.data?.description,
    type: data?.data?.type,
    date: data?.data?.date,
    id: data?.data?._id,
  };

  const { handleChange, errors, handleSubmit, values, setFieldValue } =
    useFormik({
      initialValues: initialValues,
      validationSchema: todoSchema,
      onSubmit: async (values) => {
        const response = await editTodo(values);
        if (response.status === 200) {
          navigate("/todoDetails", { state: data?.data?._id });
          toast.success(response.data.message);
          QueryClient.invalidateQueries("todoList");
        } else {
          toast.error(response.data.message);
        }
      },
    });

  return (
    <div
      className={`container mx-auto border scrollable  ${
        (values.type === "longterm" && "bg-light-blue-100") ||
        (values.type === "daily" && "bg-amber-100") ||
        (values.type === "immediate" && "bg-deep-orange-100")
      }`}
    >
      <div className="h-screen p-1  ">
        <Breadcrumbs fullWidth>
          <Link to={"/todo"}>Home</Link>

          <Link to={"/todoDetails"} state={values.id}>
            Components
          </Link>
          <a>Edit details</a>
        </Breadcrumbs>
        <form action="" onSubmit={handleSubmit}>
          <Card className="w-4/5 m-auto mt-5 shadow-2xl ">
            <Typography variant="h3" className="m-auto mt-3">
              Edit Todo
            </Typography>
            <CardBody className="flex flex-col gap-4">
              <span>Edit todo</span>
              <Input
                onChange={handleChange}
                name="title"
                value={values.title}
              />
              {errors.title && (
                <span style={{ fontSize: "0.80rem" }} className=" text-red-400">
                  {errors.title}
                </span>
              )}
              <span>Edit description</span>

              <Input
                onChange={handleChange}
                type="text"
                name="description"
                size="lg"
                value={values.description}
              />
              {errors.description && (
                <span style={{ fontSize: "0.80rem" }} className=" text-red-400">
                  {errors.description}
                </span>
              )}
              <div className="flex gap-5">
                <Card className="w-full max-w-[24rem] border mb-2">
                  <List className="">
                    <ListItem className="p-0 hover:bg-deep-orange-100">
                      <label
                        htmlFor="horizontal-list-react"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix
                          className="mr-3"
                          onClick={() => setLongTerm(false)}
                        >
                          <Radio
                            name="horizontal-list"
                            id="horizontal-list-react"
                            ripple={false}
                            className="hover:before:opacity-0 "
                            onChange={() => {
                              setFieldValue("type", "immediate"),
                                setFieldValue("date", "");
                            }}
                            containerProps={{
                              className: "p-0",
                            }}
                          />
                        </ListItemPrefix>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-body text-blue-gray-400"
                        >
                          Immediate
                        </Typography>
                      </label>
                    </ListItem>
                    <ListItem className="p-0 hover:bg-amber-100">
                      <label
                        htmlFor="horizontal-list-vue"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix
                          className="mr-3"
                          onClick={() => setLongTerm(false)}
                        >
                          <Radio
                            name="horizontal-list"
                            id="horizontal-list-vue"
                            ripple={false}
                            className="hover:before:opacity-0"
                            onChange={() => {
                              setFieldValue("type", "daily"),
                                setFieldValue("date", "");
                            }}
                            containerProps={{
                              className: "p-0",
                            }}
                          />
                        </ListItemPrefix>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium text-blue-gray-400"
                        >
                          Daily
                        </Typography>
                      </label>
                    </ListItem>
                    <ListItem className="p-0 hover:bg-light-blue-100">
                      <label
                        htmlFor="horizontal-list-svelte"
                        className="flex w-full cursor-pointer items-center px-3 py-2"
                      >
                        <ListItemPrefix className="mr-3">
                          <Radio
                            onClick={() => openDate()}
                            name="horizontal-list"
                            id="horizontal-list-svelte"
                            ripple={false}
                            className="hover:before:opacity-0"
                            onChange={() => setFieldValue("type", "longterm")}
                            containerProps={{
                              className: "p-0",
                            }}
                          />
                        </ListItemPrefix>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium text-blue-gray-400"
                        >
                          Long-term
                        </Typography>
                      </label>
                    </ListItem>
                  </List>
                </Card>
                <span className="">Previous date :{date}</span>
                {longTerm && (
                  <div className="">
                    <span className=" ">
                      <Input
                        name="date"
                        label="Add new date"
                        type="date"
                        onChange={handleChange}
                        value={values.date}
                      />
                    </span>
                  </div>
                )}
              </div>
              {errors.date && (
                <span style={{ fontSize: "0.80rem" }} className=" text-red-400">
                  {errors.date}
                </span>
              )}
            </CardBody>
            <CardFooter className="pt-0 text-end">
              <Button type="submit" variant="gradient">
                Save
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </div>
  );
}

export default TodoEdit;
