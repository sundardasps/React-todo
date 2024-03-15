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
import { Toaster, toast } from "react-hot-toast";
import { createTodo } from "../../api/userApi";
import { useQueryClient } from "@tanstack/react-query";



export function TodoInput() {
  const [open, setOpen] = React.useState(false);
  const [longTerm, setLongTerm] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => {setOpen(false),resetForm()};
  const openDate = () => setLongTerm(true);
  const queryClint = useQueryClient()

  const initialValues = {
    title:"",
    description:"",
    type:"",
    date:"",
  }

  const {handleChange,errors,handleSubmit,values,setFieldValue,resetForm} = useFormik({
    initialValues:initialValues,
    validationSchema:todoSchema,
    onSubmit:async (values)=>{
        if(values.type === "longterm"){
            if(!values.date){
               toast.error("Please add a date")
            }
        }
         const response = await createTodo(values)
         if(response.data.todoCreated){

          toast.success(response.data.message)
          queryClint.invalidateQueries('todoList')
          closeDrawer()
         }else{
          toast.error(response.data.message)
  
         }
        
    },
  })

  

  return (
    <React.Fragment>
      <Button
        onClick={openDrawer}
        className="flex items-center rounded-none border text-white bg-blue-gray-300 w-28 cursor-pointer shadow-md p-3"
      >
        <PencilSquareIcon className="w-5 m-auto" /> Add task
      </Button>
      <Drawer open={open} placement="right" size="400px" onClose={closeDrawer} className="scrollable">
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
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <form className="flex flex-col gap-2 p-5" onSubmit={handleSubmit}>
          <Input type="text" name="title" label="Todo" onChange={handleChange} value={values.title} />
          {errors.title && (
            <span style={{fontSize:"0.80rem"}}  className=" text-red-400">{errors.title}</span>
          )}
          <Textarea rows={3} name="description" label="Description" onChange={handleChange} value={values.description}/>
          {errors.description && (
            <span style={{fontSize:"0.80rem"}} className=" text-red-400">{errors.description}</span>
          )}
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
                      onChange={()=>setFieldValue('type',"immediate")}
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
                      onChange={()=>setFieldValue('type',"daily")}
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
                      onChange={()=>setFieldValue('type',"longterm")}
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
          {errors.type && (
            <span style={{fontSize:"0.80rem"}} className=" text-red-400">{errors.type}</span>
          )}
          {longTerm && <Input name="date" label="Date" type="date" onChange={handleChange} value={values.date}/>
          }
          {errors.date && longTerm && (
            <span style={{fontSize:"0.80rem"}} className=" text-red-400">{errors.date}</span>
          )}

          <Button type="submit">Create</Button>
        </form>
      </Drawer>
      <Toaster/>
    </React.Fragment>
  );
}
