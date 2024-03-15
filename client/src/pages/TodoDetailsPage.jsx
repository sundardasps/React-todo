import React from 'react'
import { NavbarComp } from '../components/todo/NavbarComp'
import  TodoDetails from '../components/todo/TodoDetails'

function TodoDetailsPage() {
  return (
    <div>
      <NavbarComp />
      <TodoDetails/>
    </div>
  )
}

export default TodoDetailsPage
