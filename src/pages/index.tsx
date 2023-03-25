import Layout from "@/components/layout";
import JSZip from "jszip";
import {
  ChangeEvent,
  DragEvent,
  Fragment,
  Suspense,
  useCallback,
  useState,
} from "react";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import { ZipFile } from "@/types";
import dynamic from "next/dynamic";
import Script from "next/script";
const ZipFileListItem = dynamic(() => import("@/components/ZipFileListItem"), {
  ssr: false,
});
const Home = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(); // Change the type of the state variable to File | null
  const [filesList, setFilesList] = useState<ZipFile[]>([]);
  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files != null && e.target.files.length > 0) {
        const file = e.target.files[0];
        setSelectedFile(file);
      }
    } catch (error) {
      toast.error("An Error Occured !");
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

  const saveAsZip = useCallback(async (file: File | null | undefined) => {
    if (file) {
      try {
        const zip = await JSZip.loadAsync(file);
        zip.forEach(async function (_relativePath, file) {
          const content = await file.async("blob");
          saveAs(content, file.name);
          toast.success("Successfully unzipped!");
        });
      } catch (error) {
        toast.error("An error Occured");
        console.log(error);
      }
    }
  }, []);

  const displayZipFile = useCallback(async () => {
    if (selectedFile) {
      try {
        const zip = await JSZip.loadAsync(selectedFile);
        // @ts-ignore
        setFilesList(Object.values(zip.files));
      } catch (error) {
        toast.error("An error Occured");
      }
    }
  }, [selectedFile]);

  return (
    <>
      <Layout>
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center w-80 sm:w-full max-w-md flex-col relative">
            <label
              onDrop={handleDrop}
              onDragEnter={handleDragOver}
              onDragEnd={handleDragOver}
              onDragLeave={handleDragOver}
              onDragOver={handleDragOver}
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              {selectedFile ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8 mb-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="mb-2 text-center text-sm text-gray-500 dark:text-gray-400">
                    {selectedFile.name}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-8 h-8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                accept=".zip,.rar"
                type="file"
                onChange={handleFileInput}
                className="hidden"
                multiple
              />
            </label>
          </div>
          <div className="grid grid-cols-2 place-content-center">
            <button
              type="button"
              onClick={() => saveAsZip(selectedFile)}
              disabled={!selectedFile}
              className="text-white w-100 mt-4 max-w-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
            >
              UnZip File{" "}
            </button>
            {selectedFile && (
              <button
                type="button"
                onClick={displayZipFile}
                disabled={!selectedFile}
                className="text-white w-100 mt-4 max-w-md bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 disabled:opacity-50"
              >
                {" "}
                Show Files{" "}
              </button>
            )}
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            {filesList.length > 0 && selectedFile && (
              <div className="relative  overflow-x-scroll">
                <div className=" scroll-snap-x-mandatory  scroll-snap-stop max-w-sm sm:max-w-3xl w-full ">
                  <table className="w-full mt-10 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="bg-slate-500 w-full text-xs text-gray-100 capitalize tracking-wider">
                      <tr>
                        <th scope="col" className="px-6 py-3">
                          File name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          File name
                        </th>
                        <th scope="col" className="px-6 py-3">
                          File name
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filesList.map((file) => {
                        return <ZipFileListItem key={file.name} file={file} />;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </Suspense>
        </div>
      </Layout>
    </>
  );
};

export default Home;
