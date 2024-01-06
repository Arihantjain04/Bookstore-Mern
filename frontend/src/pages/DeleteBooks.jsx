import { useState } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import { useSnackbar } from "notistack";

const DeleteBooks = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams()
  const { enqueueSnackbar } = useSnackbar()

  const handleDelete = () => {
    setLoading(true)
    axios
    .delete(`https://bookstore-app-mern.vercel.app/books/${id}`)
    .then(() => {
      setLoading(false)
      enqueueSnackbar("Book Deleted Successfully !!!", { variant: 'success' })
      navigate('/')
    })
    .catch((error) => {
      console.log(error);
      setLoading(false)
      enqueueSnackbar("An Error Occured !!!", { variant: 'error' });
    })
  }
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Book</h1>
      {loading ? <Spinner /> : ""}
      <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
        <h3 className='text-2xl'>Are you sure?</h3>
        <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDelete}>Yes, Delete it</button>
      </div>
    </div>
  )
}

export default DeleteBooks
