import { Link, useNavigate } from "react-router-dom";
import { TodoCardItem } from "../../style/TodoStyle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTodo, updateTodo } from "../../api/todo-api";

/* eslint-disable react/prop-types */
const TodoItem = ({ todo }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { id, title, content, isDone, deadline } = todo;
  const {mutate : deleteMutate} = useMutation({
    mutationFn : (id)=> deleteTodo(id),
    onSuccess : ()=> {
      queryClient.invalidateQueries("todos")
      navigate("/");
    }
    
  })

  const {mutate : toggleMutate} = useMutation({
    mutationFn : ({id, todo}) => updateTodo(id, todo),
    onSuccess : ()=>{
      queryClient.invalidateQueries("todos")
    }
  })

  const formattedDeadline = new Date(deadline).toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });


  return (
    <TodoCardItem $isDone={isDone}>
      <article>
        <Link to={`/${id}`}>
          <h3>{title}</h3>
          <p>{content}</p>
          <time>{formattedDeadline}</time>
        </Link>
        <div>
          <button onClick={()=> deleteMutate(id)}>삭제</button>
          <button onClick={() => toggleMutate({id, todo : {isDone : !isDone}})}>
            {isDone ? "취소" : "완료"}
          </button>
        </div>
      </article>
    </TodoCardItem>
  );
};

export default TodoItem;
