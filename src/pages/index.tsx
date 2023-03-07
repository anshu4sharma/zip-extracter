import Layout from '@/components/layout'
import JSZip from 'jszip';
import React, { ChangeEvent, DragEvent, useState } from 'react'
import { saveAs } from 'file-saver'
import toast from 'react-hot-toast';
const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(); // Change the type of the state variable to File | null
  const [filesList, setFilesList] = useState<string[]>([]);
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files != null && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file, "File");
      console.log(URL.createObjectURL(file), "URL.createObjectURL(file)");
      setSelectedFile(file);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };


  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer !== null) {
      const file = e.dataTransfer.files[0];
      console.log(file, "File");
      console.log(URL.createObjectURL(file), "URL.createObjectURL(file)");
      setSelectedFile(file);
    }
  };


  const saveAsZip = async () => {
    if (selectedFile) {
      try {
        const zip = await JSZip.loadAsync(selectedFile);
        zip.forEach(async function (_relativePath, file) {
          const content = await file.async("blob");
          saveAs(content, file.name);
          toast.success("Successfully unzipped!")
        });
      } catch (error) {
        toast.error("An error Occured")
      }
    }
  };

  const displayZipFile = async () => {
    if (selectedFile) {
      try {
        const zip = await JSZip.loadAsync(selectedFile);
        const fileList = Object.keys(zip.files).map((filename) => filename);
        setFilesList(fileList);
      } catch (error) {
        toast.error("An error Occured")
      }
    }
  };

  return (
    <Layout>
      <div className='flex flex-col items-center'>
        <div className="flex items-center justify-center w-80 sm:w-full max-w-md flex-col">
          <label onDrop={handleDrop} onDragEnter={handleDragOver} onDragEnd={handleDragOver}
            onDragLeave={handleDragOver}
            onDragOver={(e) => e.preventDefault()} htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
            {selectedFile ? (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{selectedFile.name}</p>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
              </div>
            )}
            <input id="dropzone-file" accept=".zip,.rar" type="file" onChange={handleFileInput} className="hidden" />
          </label>
        </div>
        <div className='flex flex-col justify-center items-center'>
          <button type="button" onClick={saveAsZip} disabled={!selectedFile} className="text-white w-80 mt-4 max-w-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50">UnZip File </button>
          <button type="button" onClick={displayZipFile} disabled={!selectedFile} className="text-white w-80 mt-4 max-w-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50">Display Content </button>
        </div>

      </div>
      <ul>
        {filesList.map((filename) => (
          <li key={filename}>{filename}</li>
        ))}
      </ul>
    </Layout>
  )
}

export default Home