import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../../api/todo-api";
import { useState } from "react";

const TodoController = () => {
  const {data : todos, isLoading, isError} = useQuery({
    queryKey : ["todos"],
    queryFn : getTodos
  }
  );
  console.log(todos)

  const [sortOrder, setSortOrder] = useState("asc");

  const onChangeSortOrder = (e) => {
    const nextSortOrder = e.target.value;

    // NOTE: select UI 변경
    setSortOrder(nextSortOrder);
  };


  if(isLoading){
    return <div>로딩중입니다.</div>
  }

  if(isError){
    return <div> 에러가있습니다. 에러 : {isError.message}</div>
  }

  const workingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <main>
      <TodoForm />
      <div>
        <select onChange={onChangeSortOrder} value={sortOrder}>
          <option value="asc">오름차순</option>
          <option value="desc">내림차순</option>
        </select>
      </div>
      <TodoList headTitle="Working!" todos={workingTodos} />
      <TodoList headTitle="Done!" todos={doneTodos} />
    </main>
  );
};

export default TodoController;
