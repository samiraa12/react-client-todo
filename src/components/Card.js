import DeleteModal from "./DeleteModal";
import axios from "../axiosConfig";
import toast from "react-hot-toast";


const Card = ({ todo, refetch }) => {
  const { title, _id, description,completed } = todo;
  
  const taskComplete = async ()=>{
    try {
      await axios.put(
        `/todo?todoId=${_id}`,
        {
          completed: !completed,
        }
      );
      refetch()
      toast.success("completed");
    } catch (err) {
      toast.error("something went wrong");
    }
  }
  return (
    <div className='card w-auto bg-gray-50 shadow-md my-4'>
      <div className='py-4 px-8'>
        <div className={`${completed?"line-through":""}`}>
          <div className=' '>
            <div className='flex items-center  justify-between mb-5 border-b pb-3 border-gray-200'>
              <div className='flex items-center gap-4'>
                <input onClick={taskComplete} type='checkbox' checked={completed && completed} className='checkbox' />
                <p className='font-semibold'>{title && title}</p>
              </div>
              <DeleteModal
                refetch={refetch}
                pid={_id}
              />
            </div>
            <div className='flex gap-4 items-center jusc'>
              <p>
                {description && description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
