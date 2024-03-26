"use client"

import { useState } from 'react';
import { usePrivy } from '@privy-io/react-auth';

import { addItem } from '../../../utils/supabase';

const ItemForm = () => {
  const { user} = usePrivy();

  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");
  const [location, setLocation] = useState("");
  const [id, setId] = useState(null);

  const createItem = async () => {
    const newItem = await addItem(title, detail, url, location, user?.id || "");
    // @ts-ignore
    setId(newItem[0].id || null);
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create a New Item</h2>
      <div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter title"
            onChange={(e)=> setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="detail" className="block text-gray-700 font-bold mb-2">Detail</label>
          <textarea
            id="detail"
            name="detail"
            className="border border-gray-300 rounded-md px-4 py-2 w-full h-32 resize-none focus:outline-none focus:border-blue-500"
            placeholder="Enter details"
            onChange={(e)=> setDetail(e.target.value)}
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="url" className="block text-gray-700 font-bold mb-2">Image URL</label>
          <input
            type="text"
            id="url"
            name="url"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter Image URL"
            onChange={(e)=> setUrl(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-gray-700 font-bold mb-2">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter Location"
            onChange={(e)=> setLocation(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center">
          {!id ? <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-2 rounded focus:outline-none focus:shadow-outline"
            onClick={createItem}
          >
            Submit
          </button>
          : <p className='text-center mb-3'>Item Created!</p>
          }
          {id && <a
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-center"
            target="_blank"
            href={`https://warpcast.com/~/compose?text=https://buynothing-frame.onrender.com/buynothing/item/${id}`}
            rel="noopener noreferrer"
          >
            Share and Post to Warpcast
          </a>}
        </div>
        
      </div>
    </div>
  );
};

export default ItemForm;
