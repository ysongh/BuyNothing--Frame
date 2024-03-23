"use client"

import { useState } from 'react';

import { addItem } from '../../../utils/supabase';

const ItemForm = () => {
  const [title, setTitle] = useState("");
  const [detail, setDetail] = useState("");
  const [url, setUrl] = useState("");

  const createItem = async () => {
    await addItem(title, detail, url);
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
          <label htmlFor="url" className="block text-gray-700 font-bold mb-2">Title</label>
          <input
            type="text"
            id="url"
            name="url"
            className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter Image URL"
            onChange={(e)=> setUrl(e.target.value)}
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={createItem}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemForm;
