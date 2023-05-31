import React from "react";
import { useQuery } from "react-query";
import Card from "./../components/Card";
import axios from "../axiosConfig";
import Loading from "../components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import AddTask from "../components/AddTask";

const Home = () => {
  const [user] = useAuthState(auth);
  const {
    isLoading,
    data: todos,
    refetch,
  } = useQuery("todos", async () => {
    const res = await axios.get(`/todo?userEmail=${user?.email}`);
    console.log(res.data);
    return res.data;
  });

  if (isLoading) return <Loading />;
  return (
    <div>
      <div className='w-full md:w-6/12 mx-auto my-10'>
        <AddTask user={user} refetchHome={refetch} />

        <div className='py-5'>
          <h1 className='font-semibold text-xl my-3 pl-1'>Todo</h1>
          {todos.map((element) => {
            if (!element.completed)
              return (
                <Card key={element._id} todo={element} refetch={refetch} />
              );
            return null;
          })}
        </div>
        <div className='py-5'>
          <h1 className='font-semibold text-xl my-3 pl-1'>Completed task</h1>
          {todos.map((element) => {
            if (element.completed)
              return (
                <Card key={element._id} todo={element} refetch={refetch} />
              );
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
