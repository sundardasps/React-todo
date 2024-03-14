import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Input,
  Textarea,
  ListItemPrefix,
  Radio,
  ListItem,
  List,
  Card,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useFormik } from "formik";
import { todoSchema } from "../../utils/yupValidation";

export function TodoInput() {
  const [open, setOpen] = React.useState(false);
  const [longTerm, setLongTerm] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const openDate = () => setLongTerm(true);


  const initialValues = {
    title:"",
    description:"",
    type:"",
    date:"",
  }

  const {handleChange,errors,handleSubmit,values} = useFormik({
    initialValues:initialValues,
    validationSchema:todoSchema,
    // onSubmit:,
  })

  return (
    <React.Fragment>
      <Button
        onClick={openDrawer}
        className="flex  rounded-r-none border text-white bg-blue-gray-800 w-28 cursor-pointer  shadow-md p-3 "
      >
        Add task <PencilSquareIcon className="w-5" />
      </Button>
      <Drawer open={open} placement="right" size="400px" onClose={closeDrawer}>
        <div className="flex items-center justify-between px-4 ">
          <Typography variant="h5" color="blue-gray">
            Create Your Todo
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4" onSubmit={handleSubmit}>
          <Input type="text" name="title" label="Todo" onChange={handleChange} value={values.title} />
          <Textarea rows={6} name="description" label="Description" onChange={handleChange} value={values.description}/>
          <Card className="w-full max-w-[24rem] border">
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

          {longTerm && <Input name="date" label="Date" type="date" onChange={handleChange} value={values.date}/>}

          <Button>Send Message</Button>
        </form>
      </Drawer>
    </React.Fragment>
  );
}
