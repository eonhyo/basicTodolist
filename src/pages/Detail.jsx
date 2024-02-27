import { useParams } from "react-router-dom";
import { getSingleTodo } from "../api/todo-api";
import TodoItem from "../components/todo/TodoItem";
import { useQuery } from "@tanstack/react-query";

const Detail = () => {
  const { todoId } = useParams();
  const {data : todo, isLoading, isError}= useQuery({
    queryKey : ['todo', todoId],
    queryFn : ()=> getSingleTodo(todoId),
  })

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
      />
    </section>
  );
};

export default Detail;
