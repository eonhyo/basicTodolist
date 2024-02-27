import { useContext } from "react";
import { useParams } from "react-router-dom";
import { getSingleTodo } from "../api/todo-api";
import TodoItem from "../components/todo/TodoItem";
import { TodoContext } from "../context/TodoContext";
import { useQuery } from "@tanstack/react-query";

const Detail = () => {
  const { todoId } = useParams();
  const { onDeleteTodoItem, onToggleTodoItem } = useContext(TodoContext);
  const {data : todo, isLoading, isError}= useQuery({
    queryKey : ['todo', todoId],
    queryFn : ()=> getSingleTodo(todoId),
  })

  // useEffect(() => {
  //   const fetchTodo = async () => {
  //     const data = await getSingleTodo(todoId)

  //     setTodo(data);
  //   };

  //   fetchTodo();
  // }, [todoId]);

  const handleDeleteTodoItem = async (id) => {
    await onDeleteTodoItem(id);

    // setTodo(null);
  };

  const handleToggleTodoItem = async (id) => {
    // 1. 서버에 업데이트 2. 로컬 context api 상태에 업데이트
    await onToggleTodoItem(id);

    // setTodo((prevTodo) => ({
    //   ...prevTodo,
    //   isDone: !prevTodo.isDone,
    // }));
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }
  if(isError) { 
    console.log(isError)
    return <div>에러</div>
  }
  return (
    <section>
      <TodoItem
        todo={todo}
        onDeleteTodoItem={handleDeleteTodoItem}
        onToggleTodoItem={handleToggleTodoItem}
      />
    </section>
  );
};

export default Detail;
